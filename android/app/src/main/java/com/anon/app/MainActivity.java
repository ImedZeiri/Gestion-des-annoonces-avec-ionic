package com.anon.app;

import com.getcapacitor.BridgeActivity;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate ( Bundle savedInstanceState ) {
      super.onCreate ( savedInstanceState ) ;
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
        add(GoogleAuth.class);
    }});
}
}
