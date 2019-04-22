/* eslint-disable linebreak-style */

/**
 * The view model for the application.
 */
function AppViewModel() {
  const self = this;

  this.inputColor = new ObservableRgb(0, 0, 0);
  this.comparisonSet = ko.observableArray(colorSetGenerator.rainbowSet());
  this.addColor = new ObservableRgb(0, 0, 0);
  this.addColorName = ko.observable('');

  this.closestColor = ko.pureComputed(function() {
    const smallestIndex = nearestColorFinder.nearestColor(
        self.inputColor.toRgbColor(), self.comparisonSet(),
        comparisonFormats.CIELAB);

    return self.comparisonSet()[smallestIndex];
  });

  this.addColorToSet = function() {
    const colorToAdd = self.addColor.toRgbColor();
    colorToAdd.Name = self.addColorName;
    self.comparisonSet.push(colorToAdd);
  };

  this.removeColor = function(color) {
    self.comparisonSet.remove(color);
  };
}

ko.applyBindings(new AppViewModel());
