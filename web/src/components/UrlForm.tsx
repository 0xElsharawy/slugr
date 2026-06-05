import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

type Props = {
  url: string;
  setUrl: (value: string) => void;

  onSubmit: (e: React.FormEvent) => void;

  loading: boolean;
};

export function UrlForm({ url, setUrl, onSubmit, loading }: Props) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm text-[#d4d4d4]">Destination URL</label>

        <Input
          type="url"
          placeholder="https://example.com/very/long/url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Shortening..." : "Shorten URL"}
      </Button>
    </form>
  );
}
