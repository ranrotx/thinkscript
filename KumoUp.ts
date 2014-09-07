# KumoUp.ts
# Plots a green up arrow whenever there is a Kumo buy signal (breakout above the cloud)

# Setup: Current day's candle closes above the Kumo cloud. Close from 4 days ago must 
# be in or below the cloud
# Confirmation: Chikou from 26 days ago must be above the Kumo of 26 days ago

input tenkanPeriod = 9;
input kijunPeriod = 26;

def chikou = Ichimoku("tenkan period"=tenkanPeriod,"kijun period"=kijunPeriod).Chikou;
def kumo = Ichimoku("tenkan period"=tenkanPeriod,"kijun period"=kijunPeriod)."Span A";

def setupTrue = close[0] > kumo[0] and close[4] < kumo[4];
def confirmationTrue = chikou[26] > kumo[26];

plot kumoUp = if setupTrue and confirmationTrue then low * 0.990 else Double.NaN;
kumoUp.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
kumoUp.SetLineWeight(5);
kumoUp.AssignValueColor(Color.GREEN);
kumoUp.HideBubble();
kumoUp.HideTitle();