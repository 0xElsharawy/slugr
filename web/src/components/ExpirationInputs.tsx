import { Clock3 } from "lucide-react";

import { Input } from "./ui/Input";

type Props = {
  days: string;
  setDays: (value: string) => void;

  hours: string;
  setHours: (value: string) => void;

  minutes: string;
  setMinutes: (value: string) => void;
};

export function ExpirationInputs({
  days,
  setDays,
  hours,
  setHours,
  minutes,
  setMinutes,
}: Props) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Clock3 size={16} className="text-[#b3b3b3]" />

        <label className="text-sm text-[#d4d4d4]">
          Expiration Time (optional)
        </label>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Input
          type="number"
          placeholder="Days"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />

        <Input
          type="number"
          placeholder="Hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />

        <Input
          type="number"
          placeholder="Minutes"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
        />
      </div>
    </div>
  );
}
