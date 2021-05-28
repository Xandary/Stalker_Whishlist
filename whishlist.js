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
        activeItem: 'Karazhan'
    },
    created: function () {
        this.prepareDb();
        this.fetchWhishlist().then(this.sort);
        console.log(this.db);
    },
    methods: {
        prepareDb() {
            for (const [key, value] of Object.entries(this.item)) {
                const entry = {
                    raid: key,
                    item: [],
                };
                value.forEach(element => {
                    entry.item.push({
                        name: element,
                        order: []
                    });
                });
                this.db.push(entry);
            }
        },
        fillDb(key,link) {
            return readWhishlist(link).then(data => {
                data.forEach( item => {
                    console.log(item);
                    const name = item[1];
                    const value = item[0];
                    const raid = item[2];
                    const raidEntry = this.db.find(entry => {
                        return entry.raid === raid
                    });
                    
                    if (raidEntry !== undefined) {
                        const itemEntry = raidEntry.item.find(entry => entry.name === name);
                        if (itemEntry !== undefined) {
                            itemEntry.order.push({
                                name: key,
                                value: value
                            });    
                        }                        
                    }
                });
            });
        },
        fetchWhishlist() {
            return this.fillDb('Xandary', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSYA5z622oIi-v2lhmnKaIUiD-rO2Y1CAfiftfnKT11cKunqWP98AYNkG6zDVLNCrJVJhVgEiSpcO-x/pub?gid=0&single=true&output=csv')
            .then(() => this.fillDb('Seywar', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSYA5z622oIi-v2lhmnKaIUiD-rO2Y1CAfiftfnKT11cKunqWP98AYNkG6zDVLNCrJVJhVgEiSpcO-x/pub?gid=0&single=true&output=csv'));

        },
        
        sort() {
            
        },
        isActive (menuItem) {
            return this.activeItem === menuItem
        },
        setActive (menuItem) {
            this.activeItem = menuItem
        }      
    }
}); 