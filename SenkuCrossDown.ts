# SenkuCrossDown.ts
# Plots a red down arrow when the Kumo crosses from bullish to bearish
# Note: This indicator still needs to be tested!

# Setup: Kumo 26 days into the future must be crossing from bullish to bearish.
# Trigger: Chikou from 26 days ago must be below the Kumo of 26 days ago

input tenkanPeriod = 9;
input kijunPeriod = 26;

def chikou = Ichimoku("tenkan period"=tenkanPeriod,"kijun period"=kijunPeriod).Chikou;
def kumoA = Ichimoku("tenkan period"=tenkanPeriod,"kijun period"=kijunPeriod)."Span A";
def kumoB = Ichimoku("tenkan period"=tenkanPeriod,"kijun period"=kijunPeriod)."Span B";

# kumoA below kumoB 26 days into the future, was above day before
def setupTrue = Crosses(kumoA[-26], kumoB[-26], CrossingDirection.BELOW);
def triggerTrue = chikou[26] < kumoB[26];

plot senkuCrossDown = if setupTrue and triggerTrue then high * 0.990 else Double.NaN;
senkuCrossDown.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
senkuCrossDown.SetLineWeight(5);
senkuCrossDown.AssignValueColor(Color.RED);
senkuCrossDown.HideBubble();
senkuCrossDown.HideTitle();
