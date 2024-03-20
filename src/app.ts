import { InvalidSportException, regex, sportSetsFormat } from "./utils";
import { availableSports, matches } from "./seed";
import { mergeParticipants } from "./utils/mergeParticipants";

interface MatchType {
  sport: string;
  participant1?: string;
  participant2?: string;
  score?: string | string[][];
}
interface ParsedMatchType {
  name: string;
  score: string;
}

export class EventParser {
  makeEventName(match: MatchType): string {
    const { sport, participant1, participant2 } = match;
    const sportObj = availableSports.find(
      (availableSport) => availableSport.name === sport
    );
    if (sportObj?.name !== sport) return InvalidSportException;

    return mergeParticipants({
      participant1,
      participant2,
      sign: sportObj.sign,
    });
  }

  formatScore(match: MatchType) {
    const scores =
      typeof match.score === "string" ? regex.exec(match.score) : match.score;

    if (!scores) return InvalidSportException;

    const [mainScore, set1, set2, set3] = scores.slice(1);

    // this object helps assign score to sport
    const scoreGivenFormats = {
      soccer: mainScore as string,
      handball: mainScore as string,
      tennis: sportSetsFormat({ mainScore, set1, set2, set3 }),
      volleyball: sportSetsFormat({ mainScore, set1, set2, set3 }),
      basketball: sportSetsFormat({
        basketballScore: match.score,
        basketball: true,
      }),
    };
    return scoreGivenFormats[match.sport as keyof typeof scoreGivenFormats];
  }

  compareData() {
    let matchesParsed: ParsedMatchType[] = [];

    matches.map((match) => {
      let name = this.makeEventName(match);
      let score = this.formatScore(match);

      if (name !== InvalidSportException && score !== InvalidSportException) {
        matchesParsed.push({
          name,
          score,
        });
      }
    });
    return matchesParsed;
  }
}

let parser = new EventParser();

console.log(parser.compareData());
