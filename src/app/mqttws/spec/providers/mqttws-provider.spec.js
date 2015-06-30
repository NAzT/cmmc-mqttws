describe('Provider: mqttws', function() {
  var mqttws;
  beforeEach(module('cmmcMqttws'));
  beforeEach(inject(function(_mqttws_) {
    mqttws = _mqttws_;
  }));

  it('should say hello', function() {
    expect(mqttws.greet()).toEqual('Hello');
  });

});
