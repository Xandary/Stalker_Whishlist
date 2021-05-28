const readWhishlist = async (link) => new Promise((resolve, reject) => Papa.parse(`https://cors-anywhere.herokuapp.com/${link}`, {
        download: true,
        complete: results => resolve(results.data),
        error: error => reject(error),
    }));
  
const app = new Vue({
    el: "#app",
    data: {
        item: item,
        db: [],
        activeRaid: 'Karazhan',
        activeBoss: 'Karazhan'
    },
    created: function () {
        if (db !== undefined) {
            console.log('read from db');
            this.db = db;
        } else {
            this.prepareDb();
            this.fetchWhishlist().then(this.sort).then(() =>console.log(JSON.stringify(this.db)));
        }
    },
    methods: {
        prepareDb() {
            for (const [key, value] of Object.entries(this.item)) {
                const entry = { raid: key, boss: [] };
                for (const [boss, items] of Object.entries(value)) {
                    const element = { name: boss, items: [] }
                    items.forEach(item => element.items.push({ name: item, order: [] }));                    
                    entry.boss.push(element);
                };
                this.db.push(entry);
            }
        },
        fillDb(key,link) {
            return readWhishlist(link).then(data => {
                /*data.shift();
                const raids = new Set(data.map( item => item[3]));
                raids.forEach(raid => {
                    this.item[raid] = {}
                    const dataFromRaid = data.filter(item => item[3] === raid);
                    const bosses = new Set(dataFromRaid.map(item => item[2]));
                    bosses.forEach(boss => {
                        this.item[raid][boss] = dataFromRaid.filter(item => item[2] === boss).map(item => item[0]);
                    });     
                });
                console.log(this.item)*/

                data.forEach( item => {
                    const value = item[0];
                    const name = item[1];
                    const boss = item[2];
                    const raid = item[3];
                    const raidEntry = this.db.find(entry => entry.raid === raid);
                    if (raidEntry !== undefined) {                        
                        const bossEntry = raidEntry.boss.find(entry => entry.name === boss);
                        if (bossEntry !== undefined) {
                            const itemEntry = bossEntry.items.find(entry => entry.name === name);
                            if (itemEntry !== undefined) {
                                itemEntry.order.push({
                                    name: key,
                                    value: value
                                });    
                            }
                        }                        
                    }
                });
            });
        },
        fetchWhishlist() {
            return      this.fillDb('Xandary', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSYA5z622oIi-v2lhmnKaIUiD-rO2Y1CAfiftfnKT11cKunqWP98AYNkG6zDVLNCrJVJhVgEiSpcO-x/pub?gid=0&single=true&output=csv')
             .then(() => this.fillDb('Seywar', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSm9CfMX3o4Xqi4FmH6BU8XtMRzyu9KDrHp7FDpwpuUNTcFZnBej6JYAWuhbSbk1W2Zv4Dd15dQxDvi/pub?gid=0&single=true&output=csv'));
        },
        
        sort() {
            this.db.forEach( raid => {
                raid.boss.forEach(boss => {
                    boss.items.forEach(item => {
                        item.order.sort((a, b) => b.value - a.value);
                    })
                })
            })

        },
        isRaidActive (raid) {
            return this.activeRaid === raid
        },
        setRaidActive (raid) {
            this.activeRaid = raid
        },
        isBossActive (boss) {
            return this.activeBoss === boss
        },
        setBossActive (boss) {
            this.activeBoss = boss
        }    
    }
}); 