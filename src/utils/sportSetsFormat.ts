interface SportFormat {
  mainScore?: string | string[];
  basketballScore?: string | string[][];
  set1?: string | string[];
  set2?: string | string[];
  set3?: string | string[];
  basketball?: boolean;
}
export const sportSetsFormat = ({
  mainScore,
  basketballScore,
  set1,
  set2,
  set3,
  basketball = false,
}: SportFormat): string => {
  if (basketball && basketballScore)
    return `${basketballScore[0][0]},${basketballScore[0][1]},${basketballScore[1][0]},${basketballScore[1][1]}`;
  else
    return `Main score: ${mainScore} (set1 ${set1}, set2 ${set2}, set3 ${set3})`;
};
