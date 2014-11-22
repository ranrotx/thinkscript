# KumoDown.ts
# Plots a red down arrow whenever there is a Kumo sell signal (breakout below the cloud)

# Setup: Current day's candle closes below the Kumo cloud. Close from 4 days ago must
# be in or above the cloud
# Confirmation: Chikou from 26 days ago must be below the Kumo of 26 days ago

input tenkanPeriod = 9;
input kijunPeriod = 26;

def chikou = Ichimoku("tenkan period"=tenkanPeriod,"kijun period"=kijunPeriod).Chikou;
def kumoA = Ichimoku("tenkan period"=tenkanPeriod,"kijun period"=kijunPeriod)."Span A";
def kumoB = Ichimoku("tenkan period"=tenkanPeriod,"kijun period"=kijunPeriod)."Span B";

def setupTrue = Crosses(close[0], kumoB[0], CrossingDirection.BELOW) and close[4] > kumoB[4];
def confirmationTrue = chikou[26] < kumoA[26] and chikou[26] < kumoB[26];

plot kumoDown = if setupTrue and confirmationTrue then low * 0.990 else Double.NaN;
kumoDown.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
kumoDown.SetLineWeight(5);
kumoDown.AssignValueColor(Color.RED);
kumoDown.HideBubble();
kumoDown.HideTitle();
