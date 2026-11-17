import type React from "react";
import type { SceneProps } from "../scenes";
import { IceLake } from "./ep004_IceLake";
import { Voyage } from "./ep004_Voyage";
import { PinPit } from "./ep005_PinPit";
import { Switchboard } from "./ep006_Switchboard";
import { RatCatcher } from "./ep007_RatCatcher";
import { GongFarmer } from "./ep008_GongFarmer";
import { LeechCollector } from "./ep009_LeechCollector";
import { Elevator } from "./ep014_Elevator";
import { Lector } from "./ep012_Lector";
import { Radium } from "./ep031_Radium";
import { Tudor } from "./ep029_Tudor";
import { Mudlark } from "./ep017_Mudlark";
import { Rivet } from "./ep037_Rivet";
import { LogDriver } from "./ep016_LogDriver";
import { ToadEater } from "./ep035_ToadEater";
import { PowderMonkey } from "./ep013_PowderMonkey";
import { PureFinder } from "./ep030_PureFinder";
import { PlagueDoctor } from "./ep038_PlagueDoctor";
import { ClimbingBoy } from "./ep010_ClimbingBoy";
import { Tosher } from "./ep033_Tosher";
import { BarberSurgeon } from "./ep043_BarberSurgeon";
import { FoodTaster } from "./ep034_FoodTaster";

// Bespoke per-episode scenes. Put a component in src/custom/<EpisodeId>_<Name>.tsx,
// import it here and add it to CUSTOM. Reference it from a storyboard scene with
// { "type": "custom", "visual": { "component": "<Key>" } }.
export const CUSTOM: Record<string, React.FC<SceneProps>> = {
  IceLake,
  Voyage,
  PinPit,
  Switchboard,
  RatCatcher,
  GongFarmer,
  LeechCollector,
  Elevator,
  Lector,
  Radium,
  Tudor,
  Mudlark,
  Rivet,
  LogDriver,
  ToadEater,
  PowderMonkey,
  PureFinder,
  PlagueDoctor,
  ClimbingBoy,
  Tosher,
  BarberSurgeon,
  FoodTaster,
};

// ep046 Egyptian embalmer (November queue)
import { Embalmer } from "./ep046_Embalmer";
CUSTOM.Embalmer = Embalmer;

// ep020 Town crier (November queue)
import { TownCrier } from "./ep020_TownCrier";
CUSTOM.TownCrier = TownCrier;

// ep039 Saltpeter man (November queue)
import { SaltpeterMan } from "./ep039_SaltpeterMan";
CUSTOM.SaltpeterMan = SaltpeterMan;

// ep047 Roman gladiator (November queue)
import { Gladiator } from "./ep047_Gladiator";
CUSTOM.Gladiator = Gladiator;

// ep049 Court jester (November queue)
import { CourtJester } from "./ep049_Jester";
CUSTOM.CourtJester = CourtJester;

// ep048 Pony Express rider (November queue)
import { PonyExpress } from "./ep048_PonyExpress";
CUSTOM.PonyExpress = PonyExpress;

// ep051 Samurai (November queue)
import { SamuraiScene } from "./ep051_Samurai";
CUSTOM.Samurai = SamuraiScene;

// ep050 Hatter / mercury felt maker (November queue)
import { MercuryHatter } from "./ep050_Hatter";
CUSTOM.MercuryHatter = MercuryHatter;

// ep040 Clay-kicker / WWI tunneller (November queue – Remembrance Sunday)
import { ClayKicker } from "./ep040_ClayKicker";
CUSTOM.ClayKicker = ClayKicker;

// ep011 Aircraft listener / sound locator (November queue – Armistice Day extra)
import { AircraftListener } from "./ep011_AircraftListener";
CUSTOM.AircraftListener = AircraftListener;

// ep028 Hello Girls / WWI Signal Corps telephone operators (November queue – Veterans Day)
import { HelloGirls } from "./ep028_HelloGirls";
CUSTOM.HelloGirls = HelloGirls;

// ep052 Shotgun messenger / stagecoach guard (November queue)
import { ShotgunMessenger } from "./ep052_ShotgunMessenger";
CUSTOM.ShotgunMessenger = ShotgunMessenger;

// ep054 Witch-finder / Matthew Hopkins (November queue – Friday the 13th extra)
import { WitchFinder } from "./ep054_WitchFinder";
CUSTOM.WitchFinder = WitchFinder;

// ep053 Executioner / headsman (November queue – Friday the 13th main)
import { HeadsmanScene } from "./ep053_Headsman";
CUSTOM.Headsman = HeadsmanScene;

// ep055 Press gang / naval impressment (November queue)
import { PressGang } from "./ep055_PressGang";
CUSTOM.PressGang = PressGang;

// ep056 Vestal Virgin (November queue)
import { VestalScene } from "./ep056_Vestal";
CUSTOM.Vestal = VestalScene;

// ep057 Prohibition bootlegger / rum-runner (November queue)
import { Bootlegger } from "./ep057_Bootlegger";
CUSTOM.Bootlegger = Bootlegger;

// ep058 Resurrection man / body snatcher (November queue)
import { ResurrectionMan } from "./ep058_ResurrectionMan";
CUSTOM.ResurrectionMan = ResurrectionMan;

// ep060 Fuller / Roman laundry worker (November queue – World Toilet Day)
import { FullerScene } from "./ep060_Fuller";
CUSTOM.Fuller = FullerScene;

// ep061 Whaleman / harpooner (November queue – Essex anniversary)
import { Whaleman } from "./ep061_Whaleman";
CUSTOM.Whaleman = Whaleman;

// ep059 Privateer / licensed pirate (November queue)
import { Privateer } from "./ep059_Privateer";
CUSTOM.Privateer = Privateer;

// ep021 Telegraph messenger boy (November queue – WWII home front)
import { TelegraphBoy } from "./ep021_TelegraphBoy";
CUSTOM.TelegraphBoy = TelegraphBoy;

// ep045 Whipping boy (November queue – disputed history, scapegoat twist)
import { WhippingBoy } from "./ep045_WhippingBoy";
CUSTOM.WhippingBoy = WhippingBoy;

// ep062 Ornamental hermit (November queue – gnome twist)
import { Hermit62 } from "./ep062_Hermit";
CUSTOM.Hermit = Hermit62;

// ep042 Turkey drover (November queue – Thanksgiving, presidential pardon twist)
import { TurkeyDrover } from "./ep042_TurkeyDrover";
CUSTOM.TurkeyDrover = TurkeyDrover;

// ep064 Searcher of the dead (November queue – plague follow-up to ep038, death-chart twist)
import { Searcher64 } from "./ep064_Searcher";
CUSTOM.Searcher = Searcher64;

// ep063 Milkmaid (November queue – cowpox → vaccine, vacca = cow twist)
import { Milkmaid63 } from "./ep063_Milkmaid";
CUSTOM.Milkmaid = Milkmaid63;

// ep018 Film projectionist (November queue – nitrate burns underwater, hard-drive empty-booth twist)
import { Projectionist18 } from "./ep018_Projectionist";
CUSTOM.Projectionist = Projectionist18;

// ep065 Snake-oil salesman (November queue – Black Friday, too-good-to-be-true deal twist)
import { SnakeOil65 } from "./ep065_SnakeOil";
CUSTOM.SnakeOil = SnakeOil65;

// ep066 Highwayman (November queue – Dick Turpin myth vs reality, "Completely Made-Up" TV twist)
import { Highwayman66 } from "./ep066_Highwayman";
CUSTOM.Highwayman = Highwayman66;

// ep023 Lighthouse keeper (November queue – Flannan Isles mystery, empty lantern room / Edinburgh monitoring twist)
import { Keeper23 } from "./ep023_LighthouseKeeper";
CUSTOM.LighthouseKeeper = Keeper23;

// ep067 Knight (November queue – Henry II's fatal joust, "free lances" → freelancer twist)
import { Knight67 } from "./ep067_Knight";
CUSTOM.Knight = Knight67;

// ep032 Matchstick girl (Instagram)
import { MatchGirl } from "./ep032_MatchGirl";
CUSTOM.MatchGirl = MatchGirl;

// ep078 Canary girl (Instagram – Remembrance Sunday: TNT turned munitionettes yellow; Dick, Kerr Ladies → Lionesses twist)
import { CanaryGirl } from "./ep078_CanaryGirl";
CUSTOM.CanaryGirl = CanaryGirl;

// ep079 Mill scavenger (Instagram – children swept fluff under moving spinning mules; robot-vacuum twist)
import { MillScavenger } from "./ep079_MillScavenger";
CUSTOM.MillScavenger = MillScavenger;

// ep081 Well shooter (Instagram – oil-boom shooters hauled nitroglycerin by wagon and blasted wells open; perforating-gun / fracking twist)
import { WellShooter } from "./ep081_WellShooter";
CUSTOM.WellShooter = WellShooter;

// ep071 Arsenic flower maker (Instagram – Victorian girls dusted fake leaves with arsenic emerald green; Matilda Scheurer 1861; fake-flower market twist)
import { ArsenicFlowers } from "./ep071_ArsenicFlowers";
CUSTOM.ArsenicFlowers = ArsenicFlowers;

// ep041 Poison Squad volunteer (Instagram – 1902 USDA "Hygienic Table": free meals laced with borax; paid trial-volunteer twist)
import { PoisonSquad } from "./ep041_PoisonSquad";
CUSTOM.PoisonSquad = PoisonSquad;
