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
        // this.prepareDb();
        // this.fetchWhishlist().then(this.sort).then(() =>console.log(JSON.stringify(this.db)));
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
            await this.fillDb('Tochtoch', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR4EYvimudtT6L4P9U0pQsru-j3xYwHC5dRjNctnSvhj1YGNB7V2A75U0lMWlsV8j2ssiIYSGK0Udpg/pub?gid=0&single=true&output=csv');
            await this.fillDb('Krimm', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRS2SngIqjE_58hmjYLI1P8O9cf7t4OE9vBNTJRzNeYv6SuxhvqR8N8xY59IWvSvWYnbetb76Szd2va/pub?gid=0&single=true&output=csv');
            await this.fillDb('Aewys', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR_Qi28oQY-R7ZZM_mGSoVW1MTycQv4ZE0RdAZfcky5C2ulTUj4zUt3_T9wdiH7gc9y-Okrs4drz7VF/pub?gid=0&single=true&output=csv');
            await this.fillDb('Barbieturic', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTRXpdcwlgLNTxSvtTXJ9XWnvC0JQcUwaskK9CpueZTxeSKwGI-KkYzDHv5gwAi7WDCJqBk1mfw_p_a/pub?gid=0&single=true&output=csv');
            await this.fillDb('Chuwba', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRq89GawFMad1jjS3IpMFvle6pNwHXzZPOyfXId0P4lfU3fB6VixU6_cq_fE5ToYMfob9kD5uy1bqZc/pub?gid=0&single=true&output=csv');
            await this.fillDb('Dojila', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTlBZMcxJLYuxPhgl_eUlwXCo0OAYuzBt7QMlYm2huAeiMQG2ECqSZbWGuNClDoPQlM3aldbQvIU-aL/pub?gid=0&single=true&output=csv');
            await this.fillDb('Dracho', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSxlY6xbFyocc6tF2yT9pBDsy3QD0HQ28ZxVRuGna79ZjlBiH2NY37BfWejqH3gAvEQmbejlsUP7EKK/pub?gid=0&single=true&output=csv');
            await this.fillDb('Extrim', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQDyULUB61383R1NEcdNloi33JWu8HM4D_Aw4hiKDk8Mh4-vbzOPQKHDdm-22eI1AzaBl6WSFkIrUdl/pub?gid=0&single=true&output=csv');
            await this.fillDb('Geb', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRIn7K536DNKZppadip49PmODs7Yo-1bY8mGVz9-KIm2EyDZC5UzHPwazx9enE7Vp-dyXFRFOjpGSz5/pub?gid=0&single=true&output=csv');
            await this.fillDb('Hissen', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRm52wVC4q7vQ1LeNUNgDPkcV0Dv7kd_YjuacrpRNBtjpBN6RyF-Q1fYSxpLxj68HW-7qG1EW4WVdB7/pub?gid=0&single=true&output=csv');
            await this.fillDb('Jahaag', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTy_P8RzOi-0_t-1DpusccQt26tXGIuPUSTmK2QiQLTwD4J5xVmxGYv-yXJYbTg9pXJOB6mUokYii5p/pub?gid=0&single=true&output=csv');
            await this.fillDb('Kinua', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQhr6RihR2PtQSAucCrENVHhZUqggDrUs3dNtHlm3fM_9VQDPwytP0uFfSsuWvL9qWWw0IUzPA-mPt3/pub?gid=0&single=true&output=csv');
            await this.fillDb('Mareeka', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ77i0sIPhnFh5rzFPW2yY9EUSB1ybGKm2OE8-b0emFX88C8glL_3bbZFzJQ1hmnH58xQs8me2RZVbz/pub?gid=0&single=true&output=csv');
            await this.fillDb('Rashgarroth', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTrvEdtG7khnUToClJMfV7jirEc8FAB3GjP87dpaslcJnxkC8gWgR6ITPed8k_O8LCbaVMduxZnSGe-/pub?gid=0&single=true&output=csv')
            await this.fillDb('Reps', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ9oahxsUAzQmJ6K-hZRhPY7O895OzT6a0eKEa5wYXfryYJ7j_CyamdCEI8c0JhyodNCCLR5UzBlj_E/pub?gid=0&single=true&output=csv');
            await this.fillDb('Sailar', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRfAA4WH9s8k8BMml4q9-OFcU-yBGHeUUPdnPdrE2wsvQyMdV1lfyAMMHuCQ_TzvibHnDarwRbRxHD4/pub?gid=0&single=true&output=csv');
            await this.fillDb('Suricolte', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSHK1hAsCsJuliy68KI-hfyxDiCmuJkIMFMt5ngqGL1jCkhQBKvcHl-bddALf8mzTbCd3485KWNKkB9/pub?gid=0&single=true&output=csv');
            await this.fillDb('Taurache', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTQ4bs3R4qOOzawBkpm3UNGXlIkwMbuYmrYhBDk-tGGscP6GAiOyEVR8_NBUuRDNLDZZZ3x00KTyVdh/pub?gid=0&single=true&output=csv');
            await this.fillDb('Taurnil', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vStGEJ9Be5HDTlrxLI5PFmNUnTeFfrPx-PXn7TY7VEsbUSCWkF4poysA29Lpyl6cmAAa4DVRcwF6kht/pub?gid=0&single=true&output=csv');
            await this.fillDb('Xandary', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQcc1FutaxVyJZUJEZlq3h9sm6ycFh58tqwayBY_L0FWqGDlDRPUO1MfeY0HPw9bwJq0T9hghQt5dzK/pub?gid=0&single=true&output=csv');
            await this.fillDb('Yumpalala', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTGyOYesSO8zghrPr_KQVW5oQLMgVqyzJxA0PU-uax3Yen6IzP686MZRQQFpeO7HJ4IqtfSwdU2ZfeK/pub?gid=0&single=true&output=csv');
            await this.fillDb('Zelion', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRE45pTn40bF-WZdxE9_wMF48kkTiN-3bvH7ffkjBg1QbYK0MW6Mwt9WdzwaI2t4eMpQucSOSrmz1kY/pub?gid=0&single=true&output=csv');
            await this.fillDb('Souc', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSHrS_OwlhefVkbV3QEoz8ouB6WEV67j0VclT80EjxYLYoIuR7ZprxVAuI8_ZAuK9Qc6-gqb0I5Utlu/pub?gid=0&single=true&output=csv');
            await this.fillDb('Ahwii', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRXoqAVWNuOGJegLxTbOlpWldmJBGN7WejED5BzoM-7s6gNvt6LdD-7yjvUPtRdoGn-c1prbZ59MG6K/pub?gid=0&single=true&output=csv');
            await this.fillDb('Fellerson', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT7dS0-dsvdszZubdh7tt_aM7hsWjIN9Czx6kOoxwzTkMT-N2bR_6W-PEUpSlVkLNFOd6uO-d650jHG/pub?gid=0&single=true&output=csv');
            await this.fillDb('Grinta', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRSOybM2wSaHs2hLiOlYcS358d6j7bgb0sNN8M4Ld76FYNUpmW3_A6dDSGnYuQlISJp2zyxpbQDPMB6/pub?gid=0&single=true&output=csv');
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