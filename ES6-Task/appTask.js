let appDevice=[];


class App {
    constructor(config){
        if (config.name.length >= 24 || config.name.length <= 0 || typeof config.name !== 'string'){
            throw 'string must be length between 1 and 24 latin letters,'
        }
        if(!isNaN(config.description)){
            throw 'must be a string'
        }

        if(config.version < 0 ){
            throw 'must be postive number'
        }

        if(config.rating > 10 || config.rating < 0) {
            throw 'number between 1 and 10'
        }

        this.name = config.name;
        this.description = config.description;
        this.version = config.version;
        this.rating  = config.rating;

    }
    
    release(options){
        if(!options.version || options.version < this.version){
            throw 'version not valid'
        }
        if(options.description){
            this.description = options.description;
        }
        if(options.rating){
            this.rating = options.description;
        }
    }
}

class Store extends App {
    constructor(config){
        super(config);
        this.apps = [];
    }

    uploadApp(app){

        if(!(app instanceof App)){
            throw 'must be a valid instance of the App'
        }

        const appIndex = this.apps.findIndex((obj => obj.name === app.name));
        
        if(appIndex > -1){
            if(app.version < this.apps[appIndex].version){
                throw 'version not valid update'
            }else{
                this.apps[appIndex].version = app.version;
                console.log('this version is uptdate ' + this.apps[appIndex].version) ;
            }
            if(app.description === this.apps[appIndex].description || app.description === undefined){
                console.log(app.description);
            }else{
                this.apps[appIndex].description = app.description;
                console.log('this description is uptdate ' +this.apps[appIndex].description) ;
            }
            
            if(app.rating === this.apps[appIndex].rating || app.rating === undefined){
                console.log(app.rating)
            }else{
                this.apps[appIndex].rating = app.rating;
                console.log('this rating is uptdate ' + this.apps[appIndex].rating) ;
            }

        } else {
            this.apps.push( app );
        }
    }
    takedownApp(name) {

       let  removeApp = this.apps.filter( el => el.name !== name );
       
        const appIndex = this.apps.findIndex((obj => obj.name === name));


        if(appIndex) {
            throw 'The given name does not exist in the store'
        }
    }
    search(pattern) {
        return this.apps.filter((item) =>
            item.name.toLowerCase().indexOf(pattern.toLowerCase()) > -1
        );
    }
}

class Device {
    constructor(hostname){
        if (hostname.length >= 32 || hostname.length <= 0 || typeof hostname !== 'string'){
            throw 'this is not valid';
        }
        this.hostname = hostname;
        this.apps = appDevice;
    }
    search(pattern){
        let searchApp = this.apps.filter((item) =>
            item.name.toLowerCase().indexOf(pattern.toLowerCase()) > -1
        ).sort((obj1,obj2) => obj1.name < obj2.name);
        // if(sameName !== -1) {
        //     for (let i=0; i < searchApp.length; i++) {
        //         if (searchApp[i].name === this.apps[sameName].name) {
        //             if(searchApp[i].version > this.apps[sameName].version){
        //                 return searchApp[i];
        //             }
        //         }
        //     }
        // }

    }
    install(name){
        let searchApp = this.apps.filter((item) =>
            item.name.toLowerCase().indexOf(name.toLowerCase()) > -1
        )
        const appIndex = this.apps.findIndex( app => app.name.toLowerCase() === name.toLowerCase() );
        if ( appIndex > -1 )
		    return;
        
    }
    uninstall( name ) {
        const appIndex = this.apps.findIndex( app => app.name.toLowerCase() === name.toLowerCase() );
        if ( appIndex === -1 )
            throw 'no such app is installed';

        this.apps.splice( appIndex, 1 );
        console.log(this.apps);
    }
    listInstalled() {
        const list= this.apps.sort( ( a, b ) => a.name > b.name );
        console.log(list);
    }
}

try{

    const entryDevice = [
        { name: 'youtube',
          description: 'appDivce youtube',
          version: 8,
          rating: 2,
        },
        
        { name: 'youzs',
          description: 'appDivce youtube',
          version: 10,
          rating: 2,
        },
        { name: 'facebook',
          description: 'appDivce facebook',
          version: 7,
          rating: 3,
        },
        { name: 'twitter',
          description: 'appDivce twitter',
          version: 6,
          rating: 4,
        },
        { name: 'Ted',
          description: 'appDivce Ted',
          version: 5,
          rating: 3,
        },
        { name: 'youtube',
          description: 'appDivce youtube',
          version: 9,
          rating: 2,
        },
        
    ]

    let currenyEntry;

    for(let entry of entryDevice) {
        currenyEntry = new App({
            name: entry.name,
            description: entry.description,
            version: entry.version,
            rating: entry.rating
        });

        appDevice.push(currenyEntry);
    }
    
    //Test App
    // let appOne = new App({
    //     name: 'mahmoud mamdouh matwaly',
    //     description: 'mahmoud',
    //     version: 10,
    //     rating: 5,
    // });

    
    // let appTwo = new App({
    //     name: 'mohamed mamdouh matwaly',
    //     version: 11,
    //     rating: 6,
    // });

    // let appThree = new App({
    //     name: 'ahmed mamdouh matwaly',
    //     description: 'mahmo00ud',
    //     version: 10,
    //     rating: 5
    // })
    // const storeOne = new Store(appOne);
    // storeOne.uploadApp(appOne);
    
    // storeOne.uploadApp(appTwo);
    
    // storeOne.uploadApp(appThree);

    // console.log(storeOne.search('Ahmed Mamdouh Matwaly'));

    /// Test Deivce
    const newDevice = new Device('youtube');
    // newDevice.search('t');
    
    // newDevice.uninstall('youtube');
    newDevice.listInstalled();

}
catch (e){
    console.log(e);
}

