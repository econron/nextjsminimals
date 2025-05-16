'use client';
// LessonMapMock.tsx – Curved path & 3D‑like lesson icons (mobile‑friendly scroll fix)
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, Lock, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from 'next/link';

/*****  🔤  Types *****/
type LessonStatus = "locked" | "current" | "done";
interface Lesson {
  id: string;
  title: string;
  status: LessonStatus;
  url: string;
}
interface Unit {
  id: string;
  name: string;
  lessons: Lesson[];
}

/*****  🗂️  Mock data *****/
const units: Unit[] = [
  {
    id: "u1",
    name: "L / R 発音 基礎",
    lessons: [
      { id: "u1l1", title: "light", status: "done", url: "/lessons/light" },
      { id: "u1l2", title: "right", status: "done", url: "/lessons/right" },
      { id: "u1l3", title: "light vs right", status: "current", url: "/lessons/light-vs-right" },
      { id: "u1l4", title: "role", status: "locked", url: "/lessons/role" },
    ],
  },
  {
    id: "u2",
    name: "リンキング 初級",
    lessons: [
      { id: "u2l1", title: "log in", status: "locked", url: "/lessons/log-in" },
      { id: "u2l2", title: "check out", status: "locked", url: "/lessons/check-out" },
    ],
  },
];

/*****  📐  Helper – generate sinusoidal coordinates  *****/
function useCurveCoords(totalDots: number) {
  const amplitude = 90; // horizontal swing px
  const stepY = 90; // vertical gap px
  const centerX = 160;
  return useMemo(() => {
    return Array.from({ length: totalDots }).map((_, i) => ({
      x: centerX + amplitude * Math.sin((i * Math.PI) / 4),
      y: i * stepY + 40,
    }));
  }, [totalDots]);
}

/*****  🟢  Lesson icon  *****/
const LessonDot: React.FC<{
  lesson: Lesson;
  coord: { x: number; y: number };
  onSelect: (lesson: Lesson) => void;
}> = ({ lesson, coord, onSelect }) => {
  const styles: Record<LessonStatus, string> = {
    done: "bg-gradient-to-b from-emerald-400 to-emerald-600 text-white shadow-emerald-800/50",
    current:
      "bg-gradient-to-b from-blue-400 to-blue-600 text-white shadow-blue-800/50 animate-pulse",
    locked: "bg-gradient-to-b from-gray-400 to-gray-600 text-white opacity-60 shadow-gray-800/40",
  };
  const Icon = lesson.status === "done" ? Check : lesson.status === "locked" ? Lock : Star;
  
  const content = (
    <motion.div
      className={`absolute flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-lg ${styles[lesson.status]}`}
      style={{ left: coord.x, top: coord.y }}
      whileHover={lesson.status !== "locked" ? { scale: 1.1, rotate: 3 } : {}}
      onClick={() => onSelect(lesson)}
    >
      <Icon className="h-7 w-7" />
    </motion.div>
  );

  if (lesson.status === "locked") {
    return content;
  }

  return (
    <Link href={lesson.url} onClick={() => onSelect(lesson)}>
      {content}
    </Link>
  );
};

/*****  🗺️  Lesson map with scrollable container *****/
const LessonMap: React.FC<{ units: Unit[]; onSelect: (l: Lesson) => void }> = ({ units, onSelect }) => {
  const flatLessons = units.flatMap((u) => u.lessons);
  const coords = useCurveCoords(flatLessons.length);
  const height = coords[coords.length - 1].y + 160;
  const pathD = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c.x} ${c.y}`).join(" ");

  return (
    <div className="relative mx-auto w-full max-w-xs h-screen overflow-y-auto pb-20">
      <svg
        className="absolute left-0 top-0 -z-10 pointer-events-none"
        width={320}
        height={height}
      >
        <path
          d={pathD}
          fill="none"
          stroke="#9ca3af"
          strokeDasharray="14 10"
          strokeWidth={6}
          strokeLinecap="round"
        />
      </svg>

      {flatLessons.map((lesson, i) => (
        <LessonDot 
          key={lesson.id} 
          lesson={lesson} 
          coord={coords[i]} 
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

/*****  📄  Detail pane  *****/
const LessonDetail: React.FC<{ lesson?: Lesson }> = ({ lesson }) => {
  return (
    <Card className="sticky top-4 w-full max-w-md">
      <CardContent className="p-6">
        <h2 className="mb-2 text-2xl font-semibold leading-tight">
          {lesson ? lesson.title : "レッスンを選択"}
        </h2>
        {lesson && (
          <>
            <p className="mb-4 text-muted-foreground capitalize">status: {lesson.status}</p>
            <button className="rounded-xl bg-blue-500 px-6 py-2 text-white shadow">Start Practice</button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

/*****  🚀  Page component  *****/
export default function LessonMapPage() {
  const [selected, setSelected] = useState<Lesson>();
  return (
    <div className="grid min-h-screen grid-cols-1 gap-8 bg-neutral-900 p-6 md:grid-cols-[1fr_minmax(0,420px)] lg:px-16">
      <LessonMap units={units} onSelect={setSelected} />
      <LessonDetail lesson={selected} />
    </div>
  );
}
