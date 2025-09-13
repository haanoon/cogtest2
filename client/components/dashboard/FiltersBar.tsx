import { useMemo } from "react";
import { useFilters, DateRangeKey } from "@/store/filters";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Filter } from "lucide-react";

const stores = ["All Stores", "Quito Centro", "Guayaquil Norte", "Cuenca" ];
const families = ["All Families", "BEVERAGES", "BREAD/BAKERY", "DAIRY", "PRODUCE", "CLEANING", "POULTRY"];
const items = ["All Items", "Coca Cola 2L", "White Bread", "Milk 1L", "Bananas 1kg", "Detergent", "Chicken Breast"]; 

export default function FiltersBar() {
  const { store, family, item, dateRange, setStore, setFamily, setItem, setDateRange } = useFilters();

  const params = useMemo(() => {
    const p = new URLSearchParams();
    p.set("store", store);
    p.set("family", family);
    p.set("item", item);
    p.set("dateRange", dateRange);
    return p;
  }, [store, family, item, dateRange]);

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border bg-card p-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground"><Filter className="size-4"/> Filters:</div>
      <Select value={store} onValueChange={setStore}>
        <SelectTrigger className="w-[170px]"><SelectValue placeholder="Store"/></SelectTrigger>
        <SelectContent>{stores.map((s)=> <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
      </Select>
      <Select value={family} onValueChange={setFamily}>
        <SelectTrigger className="w-[170px]"><SelectValue placeholder="Family"/></SelectTrigger>
        <SelectContent>{families.map((s)=> <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
      </Select>
      <Select value={item} onValueChange={setItem}>
        <SelectTrigger className="w-[170px]"><SelectValue placeholder="Item"/></SelectTrigger>
        <SelectContent>{items.map((s)=> <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
      </Select>
      <Select value={dateRange} onValueChange={(v: DateRangeKey)=> setDateRange(v)}>
        <SelectTrigger className="w-[150px]"><SelectValue placeholder="Date Range"/></SelectTrigger>
        <SelectContent>
          <SelectItem value="7d">Last 7 days</SelectItem>
          <SelectItem value="30d">Last 30 days</SelectItem>
          <SelectItem value="90d">Last 90 days</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline" size="sm" className="ml-auto"><CalendarIcon className="mr-2 size-4"/>Custom Range</Button>
      <input type="hidden" value={params.toString()} readOnly />
    </div>
  );
}
