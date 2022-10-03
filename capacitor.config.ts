import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.anon.app',
  appName: 'gestion-anon',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins:{
    SplashScreen: {
      launchShowDuration:0
  },
  GoogleAuth : {
    scopes : [
       "profile" ,
       "email" 
    ] ,
    serverClientId : "282931277541-omrhg6gs4tj0tc0e7ecp5trd0qlhkqo0.apps.googleusercontent.com",
    forceCodeForRefreshToken : true
},
  }
};

export default config;
