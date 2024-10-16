"use client";

import { Box, Text, Flex } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
// import Temperature from "@/components/Temperature";
// import Forecast from "@/components/Forecast";
import { useRouter } from "next/navigation";

export default function Blog() {
  const [weeklyForecast, setWeeklyForeCast] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    router.push("/contacts");
  }, []);

  return (
    <>
      <Flex
        maxW="1240px"
        mx="auto"
        my="12"
        gap={4}
        justifyContent={"space-between"}
      >
        {/* <Sidebar /> */}
        {/* <Temperature setWeeklyForeCast={setWeeklyForeCast} />
        {weeklyForecast && <Forecast weeklyForecast={weeklyForecast} />} */}
      </Flex>
    </>
  );
}
