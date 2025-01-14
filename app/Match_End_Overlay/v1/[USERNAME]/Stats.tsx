"use client";

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import {FlyInDiv} from "@/components/framer/FlyIn";
import {FlyUpDiv} from "@/components/framer/FlyUp";
import {PageTwoDiv} from "@/components/framer/PageTwo";
import {PageTreeDiv} from "@/components/framer/PageTree";
import {PageFourDiv} from "@/components/framer/PageFour";
import {PageFiveDiv} from "@/components/framer/PageFive";

type Splits = {
    Nether: number,
    Bastion: number,
    Fortress: number,
    Blind: number,
    Stronghold: number,
    End: number,
}

type Player = {
    name: string,
    uuid: string,
    isWinner: boolean,
    OriginalElo: number,
    Elo: number,
    Rank: number,
    Splits: Splits
}



type Seed = {
    Overworld: string,
    Bastion: string,
}

type Match = {
    Player1: Player,
    Player2: Player,
    Seed: Seed,
    FinalTime: number,
    EloChange: number,
    CreatedAt: number,
    id: number,
    state: string,
}

interface StatsProps {
    name: string;
}

function formatMilliseconds(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    const formattedMilliseconds = String(milliseconds).padStart(3, '0');

    return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
}


export const Stats:React.FC<StatsProps> = ({name}) => {

    const [data, setData] = useState<Match | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            const response = await fetch('/api/Data/' + name);
            if (!response.ok) {
                throw new Error('Fehler beim Abrufen der Daten');
            }
            const result = await response.json();

            if (result.data === null) {
                setData(null);
            } else {
                setData(result.data);
            }

            setLoading(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unbekannter Fehler');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();

        const interval = setInterval(() => {
            fetchData();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return <div>Lädt...</div>;
    }

    if (error) {
        return <div>Fehler: {error}</div>;
    }

    if (!data) {
        return null;
    }

    return (
        <FlyUpDiv>
            <div className="overflow-hidden">

                <Image src={"/RAHMEN.png"} alt={"RAHMEN"} width={1024} height={512} className="absolute"/>
                <div className="w-[1024px] h-[512px] absolute flex items-center justify-center overflow-hidden rounded-[5rem]">

                    <div className="absolute">
                        <FlyInDiv>
                            <div id="1" className="">
                                <span className=" text-white text-6xl">MATCH COMPLETED!</span>
                            </div>
                        </FlyInDiv>
                    </div>
                    <div className="absolute">
                        <PageTwoDiv>
                            <div id="2" className="flex flex-col items-center justify-between h-[400px] ">
                                <div id="font">
                                    {data.state == "DEFAULT" && (
                                        <div>
                                            {data.Player1.name == name && data.Player1.isWinner && (
                                                <span className="text-green-600 text-6xl">YOU WON</span>
                                            )}
                                            {data.Player1.name == name && !data.Player1.isWinner && (
                                                <span className="text-red-600 text-6xl">YOU LOST</span>
                                            )}

                                            {data.Player2.name == name && data.Player2.isWinner && (
                                                <span className="text-green-600 text-6xl">YOU WON</span>
                                            )}
                                            {data.Player2.name == name && !data.Player2.isWinner && (
                                                <span className="text-red-600 text-6xl">YOU LOST</span>
                                            )}
                                        </div>
                                    )}
                                    {data.state == "FORFEITED" && (
                                        <div>
                                            {data.Player1.name == name && data.Player1.isWinner && (
                                                <span
                                                    className="text-green-600 text-6xl">YOU WON - OPPONENT FORFEITED</span>
                                            )}
                                            {data.Player1.name == name && !data.Player1.isWinner && (
                                                <span className="text-red-600 text-6xl">YOU LOST - FORFEIT</span>
                                            )}

                                            {data.Player2.name == name && data.Player2.isWinner && (
                                                <span
                                                    className="text-green-600 text-6xl">YOU WON - OPPONENT FORFEITED</span>
                                            )}
                                            {data.Player2.name == name && !data.Player2.isWinner && (
                                                <span className="text-red-600 text-6xl">YOU LOST - FORFEIT</span>
                                            )}
                                        </div>
                                    )}
                                    {data.state == "DRAW" && (
                                        <div>
                                            <span className="text-yellow-500 text-6xl">DRAW</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-between gap-32">
                                    <div
                                        className="flex flex-col justify-between gap-4 items-center p-6 rounded-2xl bg-[#86cf28] w-[256px]">
                                        <img src={`https://minotar.net/helm/${data.Player1.name}/128.png`}
                                             alt={"RAHMEN"}
                                             width={128}
                                             height={128}/>
                                        <span className="text-center text-white text-4xl">
                                            {data.Player1.Elo}
                                            {data.Player1.isWinner && (
                                                <span className="text-green-600 text-4xl"> [+{data.EloChange}]</span>
                                            )}
                                            {!data.Player1.isWinner && (
                                                <span className="text-red-600 text-4xl"> [-{data.EloChange}]</span>
                                            )}

                        </span>
                                    </div>
                                    <div
                                        className="flex flex-col justify-between gap-4 items-center p-6 rounded-2xl bg-[#86cf28] w-[256px]">
                                        <img src={`https://minotar.net/helm/${data.Player2.name}/128.png`}
                                             alt={"RAHMEN"}
                                             width={128}
                                             height={128}/>
                                        <span className="text-center text-white text-4xl">{data.Player2.Elo}
                                            {data.Player2.isWinner && (
                                                <span className="text-green-600 text-4xl"> [+{data.EloChange}]</span>
                                            )}
                                            {!data.Player2.isWinner && (
                                                <span className="text-red-600 text-4xl"> [-{data.EloChange}]</span>
                                            )}

                        </span>
                                    </div>
                                </div>

                                <div>
                            <span
                                className="text-center text-6xl text-[#4cd7d1]">{formatMilliseconds(data.FinalTime)}</span>
                                </div>
                            </div>
                        </PageTwoDiv>
                    </div>
                    <div className="absolute">
                        <PageTreeDiv>
                            <div id="3" className="flex flex-col items-center h-[400px]">
                                <span className="text-6xl text-[#4cd7d1]">SPLITS:</span>


                                <div className="mt-[48px] flex items-center w-[800px] gap-2 text-2xl text-white">
                                    <img src={`https://minotar.net/helm/${data.Player1.name}/32.png`} alt={"RAHMEN"}
                                         width={32}
                                         height={32}/>
                                    <span>{data.Player1.name}</span>
                                </div>
                                <div className="mt-[108px] flex items-center w-[800px] gap-2 text-2xl text-white">
                                    <img src={`https://minotar.net/helm/${data.Player2.name}/32.png`} alt={"RAHMEN"}
                                         width={32}
                                         height={32}/>
                                    <span>{data.Player2.name}</span>
                                </div>


                                <div className="absolute mt-[150px] w-[800px] h-[60px] bg-green-700 overflow-hidden">
                                    <img src={"/Overworld.png"} className="w-full h-full object-cover"/>
                                </div>
                                <div className="absolute mt-[150px] h-[60px] bg-red-700 overflow-hidden"
                                     style={{
                                         width: (800 - (data.Player1.Splits.Nether / data.FinalTime * 800)),
                                         marginLeft: (data.Player1.Splits.Nether / data.FinalTime * 800)
                                     }}>
                                    <img src={"/Nether.png"} className="w-full h-full object-cover"/>
                                </div>
                                <div className="absolute mt-[150px] h-[60px] bg-neutral-800 overflow-hidden"
                                     style={{
                                         width: (800 - (data.Player1.Splits.Bastion / data.FinalTime * 800)),
                                         marginLeft: (data.Player1.Splits.Bastion / data.FinalTime * 800)
                                     }}>
                                    <img src={"/Bastion.png"} className="w-full h-full object-cover"/>
                                </div>
                                <div className="absolute mt-[150px] h-[60px] bg-red-950 overflow-hidden"
                                     style={{
                                         width: (800 - (data.Player1.Splits.Fortress / data.FinalTime * 800)),
                                         marginLeft: (data.Player1.Splits.Fortress / data.FinalTime * 800)
                                     }}>
                                    <img src={"/Fortress.png"} className="w-full h-full object-cover"/>
                                </div>
                                <div className="absolute mt-[150px] h-[60px] bg-blue-800 overflow-hidden"
                                     style={{
                                         width: (800 - (data.Player1.Splits.Blind / data.FinalTime * 800)),
                                         marginLeft: (data.Player1.Splits.Blind / data.FinalTime * 800)
                                     }}>
                                    <img src={"/Blind.png"} className="w-full h-full object-cover"/>
                                </div>
                                <div className="absolute mt-[150px] h-[60px] bg-gray-600 overflow-hidden"
                                     style={{
                                         width: (800 - (data.Player1.Splits.Stronghold / data.FinalTime * 800)),
                                         marginLeft: (data.Player1.Splits.Stronghold / data.FinalTime * 800)
                                     }}>
                                    <img src={"/Stronghold.png"} className="w-full h-full object-cover"/>
                                </div>
                                <div className="absolute mt-[150px] h-[60px] bg-yellow-200 overflow-hidden"
                                     style={{
                                         width: (800 - (data.Player1.Splits.End / data.FinalTime * 800)),
                                         marginLeft: (data.Player1.Splits.End / data.FinalTime * 800)
                                     }}>
                                    <img src={"/End.png"} className="w-full h-full object-cover"/>
                                </div>


                                <div className="absolute mt-[290px] w-[800px] h-[60px] bg-green-700 overflow-hidden">
                                    <img src={"/Overworld.png"} className="w-full h-full object-cover"/>
                                </div>
                                <div className="absolute mt-[290px] h-[60px] bg-red-700 overflow-hidden"
                                     style={{
                                         width: (800 - (data.Player2.Splits.Nether / data.FinalTime * 800)),
                                         marginLeft: (data.Player2.Splits.Nether / data.FinalTime * 800)
                                     }}>
                                    <img src={"/Nether.png"} className="w-full h-full object-cover"/>
                                </div>
                                <div className="absolute mt-[290px] h-[60px] bg-neutral-800 overflow-hidden"
                                     style={{
                                         width: (800 - (data.Player2.Splits.Bastion / data.FinalTime * 800)),
                                         marginLeft: (data.Player2.Splits.Bastion / data.FinalTime * 800)
                                     }}>
                                    <img src={"/Bastion.png"} className="w-full h-full object-cover"/>
                                </div>
                                <div className="absolute mt-[290px] h-[60px] bg-red-950 overflow-hidden"
                                     style={{
                                         width: (800 - (data.Player2.Splits.Fortress / data.FinalTime * 800)),
                                         marginLeft: (data.Player2.Splits.Fortress / data.FinalTime * 800)
                                     }}>
                                    <img src={"/Fortress.png"} className="w-full h-full object-cover"/>
                                </div>
                                <div className="absolute mt-[290px] h-[60px] bg-blue-800 overflow-hidden"
                                     style={{
                                         width: (800 - (data.Player2.Splits.Blind / data.FinalTime * 800)),
                                         marginLeft: (data.Player2.Splits.Blind / data.FinalTime * 800)
                                     }}>
                                    <img src={"/Blind.png"} className="w-full h-full object-cover"/>
                                </div>
                                <div className="absolute mt-[290px] h-[60px] bg-gray-600 overflow-hidden"
                                     style={{
                                         width: (800 - (data.Player2.Splits.Stronghold / data.FinalTime * 800)),
                                         marginLeft: (data.Player2.Splits.Stronghold / data.FinalTime * 800)
                                     }}>
                                    <img src={"/Stronghold.png"} className="w-full h-full object-cover"/>
                                </div>
                                <div className="absolute mt-[290px] h-[60px] bg-yellow-200 overflow-hidden"
                                     style={{
                                         width: (800 - (data.Player2.Splits.End / data.FinalTime * 800)),
                                         marginLeft: (data.Player2.Splits.End / data.FinalTime * 800)
                                     }}>
                                    <img src={"/End.png"} className="w-full h-full object-cover"/>
                                </div>
                            </div>
                        </PageTreeDiv>
                    </div>
                    <div className="absolute">
                        <PageFourDiv>
                            <div id="4" className="w-[990px] h-[480px] p-8 ">
                                {data.Seed.Overworld == "VILLAGE" && (
                                    <div className="w-[959px] h-[448px] overflow-hidden flex justify-between">
                                        <div className="flex flex-col gap-24">
                                            <span className="text-6xl text-[#4cd7d1]">SEED TYPE:</span>
                                            <span className="text-8xl text-[#86cf28]">VILLAGE</span>

                                        </div>
                                        <div className="flex justify-end items-end w-[25rem]">
                                            <img src={"/Village.png"} className="h-[25rem] ml-[34.95rem] "/>
                                        </div>
                                    </div>
                                )}
                                {data.Seed.Overworld == "SHIPWRECK" && (
                                    <div className="w-[959px] h-[448px] overflow-hidden flex justify-between">
                                        <div className="flex flex-col gap-24">
                                            <span className="text-6xl text-[#4cd7d1]">SEED TYPE:</span>
                                            <span className="text-8xl text-[#86cf28]">SHIPWRECK</span>

                                        </div>
                                        <div className="flex justify-end items-end w-[25rem]">
                                            <img src={"/Ship.png"} className="h-[16rem] mr-[1rem] "/>
                                        </div>
                                    </div>
                                )}
                                {data.Seed.Overworld == "DESERT_TEMPLE" && (
                                    <div className="w-[959px] h-[448px] overflow-hidden flex justify-between">
                                        <div className="flex flex-col gap-24">
                                            <span className="text-6xl text-[#4cd7d1]">SEED TYPE:</span>
                                            <span className="text-8xl text-[#86cf28]">DESERT <br/>TEMPLE</span>

                                        </div>
                                        <div className="flex justify-end items-center w-[25rem]">
                                            <img src={"/Tempel.png"} className="h-[16rem] mr-[2rem] mt-[4rem]"/>
                                        </div>
                                    </div>
                                )}
                                {data.Seed.Overworld == "RUINED_PORTAL" && (
                                    <div
                                        className="w-[959px] h-[448px] ml-[-2.05rem] overflow-hidden flex justify-between ">
                                        <div className="flex justify-end items-end w-[25rem] ">
                                            <img src={"/Portal.png"} className="h-[25rem] mb-8"/>
                                        </div>
                                        <div className="flex flex-col gap-24 mr-16">
                                            <span className="text-6xl text-[#4cd7d1]">SEED TYPE:</span>
                                            <span className="text-8xl text-[#86cf28]">RUINED <br/>PORTAL</span>

                                        </div>
                                    </div>
                                )}{data.Seed.Overworld == "BURIED_TREASURE" && (
                                <div
                                    className="w-[959px] h-[448px] ml-[-2.05rem] overflow-hidden flex justify-between ">
                                    <div className="flex justify-end items-end w-[25rem] ">
                                        <img src={"/Burried.png"} className="h-[25rem] mb-8"/>
                                    </div>
                                    <div className="flex flex-col gap-24 mr-16">
                                        <span className="text-6xl text-[#4cd7d1]">SEED TYPE:</span>
                                        <span className="text-8xl text-[#86cf28]">BURIED <br/>TREASURE</span>
                                    </div>
                                </div>
                            )}

                            </div>
                        </PageFourDiv>
                    </div>
                    <div className="absolute">
                        <PageFiveDiv>
                            <div id="5" className="w-[990px] h-[480px] p-8 ">
                                {data.Seed.Bastion == "TREASURE" && (
                                    <div className="w-[959px] h-[448px] overflow-hidden flex justify-between">
                                        <div className="flex flex-col gap-24">
                                            <span className="text-6xl text-[#4cd7d1]">BASTION TYPE:</span>
                                            <span className="text-8xl text-[#86cf28]">TREASURE</span>

                                        </div>
                                        <div className="flex justify-end items-end w-[25rem]">
                                            <img src={"/Treasure.png"} className="h-[25rem] ml-[34.95rem] "/>
                                        </div>
                                    </div>
                                )}
                                {data.Seed.Bastion == "STABLES" && (
                                    <div
                                        className="w-[959px] h-[448px] ml-[-2.05rem] overflow-hidden flex justify-between ">
                                        <div className="flex justify-end items-end w-[25rem] ">
                                            <img src={"/Stables.png"} className="h-[25rem]"/>
                                        </div>
                                        <div className="flex flex-col gap-24 mr-16">
                                            <span className="text-6xl text-[#4cd7d1]">BASTION TYPE:</span>
                                            <span className="text-8xl text-[#86cf28]">STABLES</span>

                                        </div>
                                    </div>
                                )}
                                {data.Seed.Bastion == "HOUSING" && (
                                    <div className="w-[959px] h-[448px] overflow-hidden flex justify-between">
                                        <div className="flex flex-col gap-24">
                                            <span className="text-6xl text-[#4cd7d1]">BASTION TYPE:</span>
                                            <span className="text-8xl text-[#86cf28]">HOUSING</span>

                                        </div>
                                        <div className="flex justify-end items-end w-[25rem]">
                                            <img src={"/Housing.png"} className="h-[25rem] "/>
                                        </div>
                                    </div>
                                )}
                                {data.Seed.Bastion == "BRIDGE" && (
                                    <div className="w-[959px] h-[448px] overflow-hidden flex justify-between">
                                        <div className="flex flex-col gap-24">
                                            <span className="text-6xl text-[#4cd7d1]">BASTION TYPE:</span>
                                            <span className="text-8xl text-[#86cf28]">BRIDGE</span>

                                        </div>
                                        <div className="flex justify-end items-end w-[25rem]">
                                            <img src={"/Bridge.png"} className="h-[29rem] "/>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </PageFiveDiv>
                    </div>
                </div>
                <Image src={"/RAHMENRAW.png"} alt={"RAHMEN"} width={1024} height={512} className="absolute"/>
            </div>
        </FlyUpDiv>
    );
};
