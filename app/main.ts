// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import firebase = require("nativescript-plugin-firebase");
import { AppModule } from "./app.module";
import { UserService } from "./services/user.service";

firebase.init({
  onAuthStateChanged: (data: any) => {
    console.log(JSON.stringify(data));
    if (data.loggedIn) {
      UserService.userId = data.user.uid; 
      // could also store data.user.email
    }
    else {
      UserService.userId = '';
    }
  }
}).then(
  function (instance) {
    console.log("firebase.init done");
  },
  function (error) {
    console.log("firebase.init error: " + error);
  }
);

const platform = platformNativeScriptDynamic();
platform.bootstrapModule(AppModule);

