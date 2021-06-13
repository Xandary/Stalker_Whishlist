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
        this.db = db;
        //    this.prepareDb();
        //    this.fetchWhishlist().then(this.sort).then(() =>console.log(JSON.stringify(this.db)));

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
                data.shift();
                const raids = new Set(data.map( item => item[3]));
                raids.forEach(raid => {
                    this.item[raid] = {}
                    const dataFromRaid = data.filter(item => item[3] === raid);
                    const bosses = new Set(dataFromRaid.map(item => item[2]));
                    bosses.forEach(boss => {
                        this.item[raid][boss] = dataFromRaid.filter(item => item[2] === boss).map(item => item[0]);
                    });     
                });
                console.log('this.item', this.item)

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
        async fetchWhishlist() {
            await this.fillDb('Rashgarroth', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTrvEdtG7khnUToClJMfV7jirEc8FAB3GjP87dpaslcJnxkC8gWgR6ITPed8k_O8LCbaVMduxZnSGe-/pub?gid=0&single=true&output=csv')
            await this.fillDb('Xandary', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQcc1FutaxVyJZUJEZlq3h9sm6ycFh58tqwayBY_L0FWqGDlDRPUO1MfeY0HPw9bwJq0T9hghQt5dzK/pub?gid=0&single=true&output=csv');
            await this.fillDb('Grinta', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRSOybM2wSaHs2hLiOlYcS358d6j7bgb0sNN8M4Ld76FYNUpmW3_A6dDSGnYuQlISJp2zyxpbQDPMB6/pub?gid=0&single=true&output=csv');
            await this.fillDb('Ahwii', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQZKo84SREeDwPFyLghJhbRDyjrgPSoer-4ClwpP32zI_GdELVkjNPnWHixo3xseIytU3EDxYpoTUA-/pub?gid=0&single=true&output=csv');
            await this.fillDb('Zelion', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRE45pTn40bF-WZdxE9_wMF48kkTiN-3bvH7ffkjBg1QbYK0MW6Mwt9WdzwaI2t4eMpQucSOSrmz1kY/pub?gid=0&single=true&output=csv');
            await this.fillDb('Taurnil', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vStGEJ9Be5HDTlrxLI5PFmNUnTeFfrPx-PXn7TY7VEsbUSCWkF4poysA29Lpyl6cmAAa4DVRcwF6kht/pub?gid=0&single=true&output=csv');
            await this.fillDb('Dojila', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTlBZMcxJLYuxPhgl_eUlwXCo0OAYuzBt7QMlYm2huAeiMQG2ECqSZbWGuNClDoPQlM3aldbQvIU-aL/pub?gid=0&single=true&output=csv');
            await this.fillDb('Fellerson', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRub7bdZaJjs-sfCsFfSv1bgLheKuLu0-W_7VrEKT9ZKcigZickSyuXyVylfX1Z3aR4hs7zW4qt1EUx/pub?gid=0&single=true&output=csv');
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