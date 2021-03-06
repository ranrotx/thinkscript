# KijunUp.ts
# Plots a green up arrow whenever there is a Kijun buy signal

# Setup: Current day's candle closes above the Kijun. Close from 2 days ago must be below the Kijun
# Trigger: Chikou from 26 days ago must be above the Kumo of 26 days ago

input tenkanPeriod = 9;
input kijunPeriod = 26;

def kijun = Ichimoku("tenkan period"=tenkanPeriod,"kijun period"=kijunPeriod).Kijun;
def chikou = Ichimoku("tenkan period"=tenkanPeriod,"kijun period"=kijunPeriod).Chikou;
def kumoA = Ichimoku("tenkan period"=tenkanPeriod,"kijun period"=kijunPeriod)."Span A";
def kumoB = Ichimoku("tenkan period"=tenkanPeriod,"kijun period"=kijunPeriod)."Span B";

def setupTrue = Crosses(close[0], kijun[0], CrossingDirection.ABOVE) and close[2] < kijun[2];
def triggerTrue = chikou[26] > kumoA[26] and chikou[26] > kumoB[26];

plot kijunUp = if setupTrue and triggerTrue then low * 0.990 else Double.NaN;
kijunUp.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
kijunUp.SetLineWeight(5);
kijunUp.AssignValueColor(Color.GREEN);
kijunUp.HideBubble();
kijunUp.HideTitle();
