/* eslint-disable linebreak-style */

/**
 * The view model for the application.
 */
function AppViewModel() {
  const self = this;

  this.inputColor = new ObservableRgb(0, 0, 0);
  this.comparisonSet = ko.observableArray(colorSetGenerator.rainbowSet());

  this.addColor = ko.observable(new RgbColor(0, 0, 0, ''));

  this.closestColor = ko.pureComputed(function() {
    const iC = nearestColorFinder.nearestColor(
        self.inputColor.toRgbColor(), self.comparisonSet(),
        comparisonFormats.CIELAB);

    return self.comparisonSet()[iC];
  });

  this.addColorToSet = function() {
    self.comparisonSet.push(self.addColor);
    self.addColor = ko.observable(new RgbColor(0, 0, 0, ''));
  };

  this.removeColor = function(color) {
    self.comparisonSet.remove(color);
  };
}

ko.applyBindings(new AppViewModel());
