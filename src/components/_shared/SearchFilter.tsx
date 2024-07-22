"use client";

import { useState } from "react";

import { PiCaretDown, PiCaretUp } from "react-icons/pi";
import { RiFilter3Fill, RiCloseLine } from "react-icons/ri";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup } from "@/components/ui/radio-group";
import RadioGroupItemExt from "@/components/_uiext/RadioGroupItemExt";
import useSearchStore from "@/zustand/Search";

export default function SearchFilter() {
  const search = useSearchStore();

  const [open, setOpen] = useState(false);

  const costFilters = [
    {
      value: "all",
      label: "All"
    },
    {
      value: "free",
      label: "Free"
    },
    {
      value: "<5",
      label: "< $5.00"
    },
    {
      value: "<10",
      label: "< $10.00"
    },
    {
      value: "<25",
      label: "< $25.00"
    },
    {
      value: ">25",
      label: "> $25.00"
    }
  ];

  const genderFilters = [
    {
      value: "all",
      label: "All"
    },
    {
      value: "Male",
      label: "Male"
    },
    {
      value: "Female",
      label: "Female"
    },
    {
      value: "Unknown",
      label: "Unknown"
    }
  ];

  const likesFilters = [
    {
      value: "all",
      label: "All"
    },
    {
      value: "<1k",
      label: "Under 1K"
    },
    {
      value: "<5k",
      label: "Less than 5k"
    },
    {
      value: ">5k",
      label: "Over 5K"
    }
  ];

  const picturesFilters = [
    {
      value: "all",
      label: "All"
    },
    {
      value: "<100",
      label: "Under 100"
    },
    {
      value: "<500",
      label: "Less than 500"
    },
    {
      value: "<1k",
      label: "Less than 1k"
    },
    {
      value: ">1k",
      label: "Over 1k"
    }
  ];

  const videosFilters = [
    {
      value: "all",
      label: "All"
    },
    {
      value: "<100",
      label: "Under 100"
    },
    {
      value: "<500",
      label: "Less than 500"
    },
    {
      value: "<1k",
      label: "Less than 1k"
    },
    {
      value: ">1k",
      label: "Over 1k"
    }
  ];

  const handleOpenClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClearClick = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    e.stopPropagation();
    search.clearSelected();
  };

  const handleCostChange = (value: string) => {
    const cost = costFilters.filter((cf) => cf.value === value)[0];
    search.setSelected({
      category: "Cost",
      condition: cost
    });
  };

  const handleGenderChange = (value: string) => {
    const gender = genderFilters.filter((lf) => lf.value === value)[0];
    search.setSelected({ category: "Gender", condition: gender });
  };

  const handleLikesChange = (value: string) => {
    const likes = likesFilters.filter((lf) => lf.value === value)[0];
    search.setSelected({
      category: "Likes",
      condition: likes
    });
  };

  const handlePicturesChange = (value: string) => {
    const pictures = picturesFilters.filter((lf) => lf.value === value)[0];
    search.setSelected({
      category: "Pictures",
      condition: pictures
    });
  };

  const handleVideosChange = (value: string) => {
    const videos = videosFilters.filter((lf) => lf.value === value)[0];
    search.setSelected({
      category: "Videos",
      condition: videos
    });
  };

  return (
    <div className="w-full md:w-[714px]">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="w-full">
          <div className="flex items-center justify-between gap-[16px] rounded-[5px] border-[1px] border-[#DDDDDD] bg-[#F9F9F9] p-[16px]">
            <RiFilter3Fill className="h-[15px] w-[15px] md:h-[20px] md:w-[20px]" />

            <div className="font-ca flex-1 text-left text-[15px] font-[400] text-[#515151] md:text-[18px]">
              {search.selected.length > 0
                ? search.selected.map((s) => (
                    <span key={s.category} className="mr-[4px]">
                      <span className="text-[#00AFF0]">{s.category}: </span>
                      {s.condition.label}
                    </span>
                  ))
                : !open
                  ? "Narrow your search filters"
                  : "Filters"}
            </div>

            <div className="flex items-center justify-between gap-[12px]">
              {search.selected.length > 0 && (
                <RiCloseLine
                  onClick={handleClearClick}
                  className="h-[15px] w-[15px] text-[#f04c00] md:h-[20px] md:w-[20px]"
                />
              )}

              {!open && (
                <PiCaretDown
                  className="h-[15px] w-[15px] text-[#000000] md:h-[20px] md:w-[20px]"
                  onClick={handleOpenClick}
                />
              )}

              {open && (
                <PiCaretUp
                  className="h-[15px] w-[15px] text-[#000000] md:h-[20px] md:w-[20px]"
                  onClick={handleOpenClick}
                />
              )}
            </div>
          </div>
        </PopoverTrigger>

        <PopoverContent className="w-[calc(100vw-32px)] md:w-[714px]">
          <ScrollArea className="h-[200px] w-full pr-[16px]">
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="cost">
                <AccordionTrigger>Cost</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-[10px]">
                  <RadioGroup
                    value={
                      search.selected.filter((s) => s.category === "Cost")?.[0]
                        ?.condition.value ?? costFilters[0].value
                    }
                    onValueChange={handleCostChange}
                  >
                    {costFilters.map((cf) => (
                      <RadioGroupItemExt
                        key={cf.value}
                        value={cf.value}
                        label={cf.label}
                      />
                    ))}
                  </RadioGroup>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="gender">
                <AccordionTrigger>Gender</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-[10px]">
                  <RadioGroup
                    value={
                      search.selected.filter(
                        (s) => s.category === "Gender"
                      )?.[0]?.condition.value ?? genderFilters[0].value
                    }
                    onValueChange={handleGenderChange}
                  >
                    {genderFilters.map((cf) => (
                      <RadioGroupItemExt
                        key={cf.value}
                        value={cf.value}
                        label={cf.label}
                      />
                    ))}
                  </RadioGroup>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="likes">
                <AccordionTrigger>Likes</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-[10px]">
                  <RadioGroup
                    value={
                      search.selected.filter((s) => s.category === "Likes")?.[0]
                        ?.condition.value ?? likesFilters[0].value
                    }
                    onValueChange={handleLikesChange}
                  >
                    {likesFilters.map((cf) => (
                      <RadioGroupItemExt
                        key={cf.value}
                        value={cf.value}
                        label={cf.label}
                      />
                    ))}
                  </RadioGroup>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="pictures">
                <AccordionTrigger>Pictures</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-[10px]">
                  <RadioGroup
                    value={
                      search.selected.filter(
                        (s) => s.category === "Pictures"
                      )?.[0]?.condition.value ?? picturesFilters[0].value
                    }
                    onValueChange={handlePicturesChange}
                  >
                    {picturesFilters.map((cf) => (
                      <RadioGroupItemExt
                        key={cf.value}
                        value={cf.value}
                        label={cf.label}
                      />
                    ))}
                  </RadioGroup>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="videos">
                <AccordionTrigger>Videos</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-[10px]">
                  <RadioGroup
                    value={
                      search.selected.filter(
                        (s) => s.category === "Videos"
                      )?.[0]?.condition.value ?? videosFilters[0].value
                    }
                    onValueChange={handleVideosChange}
                  >
                    {videosFilters.map((cf) => (
                      <RadioGroupItemExt
                        key={cf.value}
                        value={cf.value}
                        label={cf.label}
                      />
                    ))}
                  </RadioGroup>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  );
}
