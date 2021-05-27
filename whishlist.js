/*const readWhishlist = async (link) => new Promise((resolve, reject) => Papa.parse(`https://cors-anywhere.herokuapp.com/${link}`, {
        download: true,
        complete: results => resolve(results.data),
        error: error => reject(error),
    }));
  
const app = new Vue({
    el: "#app",
    data: {
        whishlit: {},
        item: item,
        db: [],
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
                    });
                });
                this.db.push(entry);
            }
        },
        fillDb(key,link) {
            return readWhishlist(link).then(data => this.whishlit[key] = data);
        },
        fetchWhishlist() {
            return this.fillDb('xandary', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSYA5z622oIi-v2lhmnKaIUiD-rO2Y1CAfiftfnKT11cKunqWP98AYNkG6zDVLNCrJVJhVgEiSpcO-x/pub?gid=0&single=true&output=csv');
        },
        sort() {
            
        }
      
    }
}); */
var app2 = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue !'
    }
})