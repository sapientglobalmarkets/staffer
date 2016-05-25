# staffer-ng2-falcor

To run this application, first make sure that both staffer-server-rest and staffer-server-concepts are running. In staffer-server-concepts, copy `model_full_data` from data.js to `model` in server.js.

Then run the following commands in this directory:

```bash
$ npm install
$ ng serve
```

Now point your browser to http://localhost:4200/.

Note: This version of Staffer is under construction. Currently it only fetches the needs from the Facore server. All other entities are fetched from the REST server.
