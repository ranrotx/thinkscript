# KijunDown.ts
# Plots a red down arrow whenever there is a Kijun sell signal

# Setup: Current day's candle closes below the Kijun.
# Close from 2 days ago must be above the Kijun
# Trigger: Chikou from 26 days ago must be below the Kumo of 26 days ago

input tenkanPeriod = 9;
input kijunPeriod = 26;

def kijun = Ichimoku("tenkan period"=tenkanPeriod,"kijun period"=kijunPeriod).Kijun;
def chikou = Ichimoku("tenkan period"=tenkanPeriod,"kijun period"=kijunPeriod).Chikou;
def kumo = Ichimoku("tenkan period"=tenkanPeriod,"kijun period"=kijunPeriod)."Span A";

def setupTrue = Crosses(close[0], kijun[0], CrossingDirection.BELOW) and close[2] > kijun[2];
def triggerTrue = chikou[26] < kumo[26];

plot kijunDown = if setupTrue and triggerTrue then high * 0.990 else Double.NaN;
kijunDown.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
kijunDown.SetLineWeight(5);
kijunDown.AssignValueColor(Color.RED);
kijunDown.HideBubble();
kijunDown.HideTitle();
