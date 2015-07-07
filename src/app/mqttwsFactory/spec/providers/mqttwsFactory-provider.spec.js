describe('Provider: mqttwsFactory', function() {
  var mqttwsFactory;
  beforeEach(module('cmmcMqttws'));
  beforeEach(inject(function(_mqttwsFactory_) {
    mqttwsFactory = _mqttwsFactory_;
  }));

  it('should say hello', function() {
    expect(mqttwsFactory.greet()).toEqual('Hello');
  });

});
