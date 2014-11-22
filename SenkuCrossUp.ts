# SenkuCrossUp.ts
# Plots a green up arrow when the Kumo crosses from bearish to bullish
# Note: This indicator still needs to be tested!

# Setup: Kumo 26 days into the future must be crossing from bearish to bullish.
# Trigger: Chikou from 26 days ago must be above the Kumo of 26 days ago

input tenkanPeriod = 9;
input kijunPeriod = 26;

def chikou = Ichimoku("tenkan period"=tenkanPeriod,"kijun period"=kijunPeriod).Chikou;
def kumoA = Ichimoku("tenkan period"=tenkanPeriod,"kijun period"=kijunPeriod)."Span A";
def kumoB = Ichimoku("tenkan period"=tenkanPeriod,"kijun period"=kijunPeriod)."Span B";

# kumoA above kumoB 26 days into the future, was below day before
def setupTrue = Crosses(kumoA[-26], kumoB[-26], CrossingDirection.ABOVE);
def triggerTrue = chikou[26] > kumoA[26] and chikou[26] > kumoB[26];

plot senkuCrossUp = if setupTrue and triggerTrue then low * 0.990 else Double.NaN;
senkuCrossUp.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
senkuCrossUp.SetLineWeight(5);
senkuCrossUp.AssignValueColor(Color.GREEN);
senkuCrossUp.HideBubble();
senkuCrossUp.HideTitle();
