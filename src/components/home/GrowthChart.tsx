import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { year: "2015-16", value: 26.56, display: "₹26.55 Cr" },
  { year: "2016-17", value: 8.70, display: "₹8.70 Cr" },
  { year: "2017-18", value: 13.05, display: "₹13.05 Cr" },
  { year: "2018-19", value: 23.27, display: "₹23.27 Cr" },
  { year: "2019-20", value: 22.56, display: "₹22.56 Cr" },
  { year: "2020-21", value: 11.97, display: "₹11.97 Cr" },
  { year: "2021-22", value: 15.65, display: "₹15.65 Cr" },
  { year: "2022-23", value: 25.92, display: "₹25.92 Cr" },
  { year: "2023-24", value: 22.12, display: "₹22.12 Cr" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-4 rounded-lg shadow-custom-lg border border-border">
        <p className="font-heading text-lg font-bold text-foreground">{label}</p>
        <p className="text-primary font-semibold">{payload[0].payload.display}</p>
      </div>
    );
  }
  return null;
};

export function GrowthChart() {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom px-4">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <span className="inline-block px-4 py-2 bg-secondary/10 rounded-full text-secondary text-sm font-medium mb-4">
            Financial Growth
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our <span className="text-secondary">Growth</span> Journey
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Consistent growth reflecting our commitment to excellence and client satisfaction over the years.
          </p>
        </div>

        {/* Chart */}
        <div className="bg-muted rounded-2xl p-4 md:p-8 shadow-custom">
          <div className="h-[300px] md:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(214, 80%, 40%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(214, 80%, 40%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 30%, 88%)" />
                <XAxis
                  dataKey="year"
                  tick={{ fill: "hsl(214, 30%, 45%)", fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: "hsl(214, 30%, 88%)" }}
                />
                <YAxis
                  tick={{ fill: "hsl(214, 30%, 45%)", fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: "hsl(214, 30%, 88%)" }}
                  tickFormatter={(value) => `₹${value}Cr`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(214, 80%, 40%)"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-6 md:mt-8 pt-6 border-t border-border">
            <div className="text-center">
              <p className="font-heading text-2xl md:text-3xl font-bold text-primary">₹22.12 Cr</p>
              <p className="text-xs md:text-sm text-muted-foreground">FY 2023-24</p>
            </div>
            <div className="text-center">
              <p className="font-heading text-2xl md:text-3xl font-bold text-secondary">₹25.92 Cr</p>
              <p className="text-xs md:text-sm text-muted-foreground">Peak Revenue</p>
            </div>
            <div className="text-center">
              <p className="font-heading text-2xl md:text-3xl font-bold text-foreground">9+ Years</p>
              <p className="text-xs md:text-sm text-muted-foreground">Consistent Growth</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
