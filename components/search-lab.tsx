"use client";

import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import qs from "query-string";
import { Input } from "./ui/input";

const SearchInputLab = () => {
  const [value, setValue] = useState("");
  const debounceValue = useDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();


  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: debounceValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [debounceValue, router, pathname]);

  return (
    <div className="relative">
      <SearchIcon className="h-4 w-4 absolute top-3 left-3 text-slate-900" />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
        placeholder="Поиск по работам"
      />
    </div>
  );
};

export default SearchInputLab;