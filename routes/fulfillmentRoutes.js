const {WebhookClient} = require('dialogflow-fulfillment');


module.exports = app => {
    app.post('/', async (req, res) => {
        const agent = new WebhookClient({ request: req, response: res});
        
        function fallback(agent) {
            agent.add("I'm sorry, I don't understand");
            agent.add("Can you try describing the recipe you're looking for differently?");
        }
        let intentMap = new Map();
        
        intentMap.set('Default Fallback Intent', fallback);
        
        agent.handleRequest(intentMap);
        
    });
}