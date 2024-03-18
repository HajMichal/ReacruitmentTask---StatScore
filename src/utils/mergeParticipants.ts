import { InvalidPaticipantsException } from "./exceptions";

interface MergeParticipantsType {
  participant1?: string;
  participant2?: string;
  sign: string;
}

export const mergeParticipants = ({
  participant1,
  participant2,
  sign,
}: MergeParticipantsType): string => {
  if (participant1 && participant2)
    return `${participant1} ${sign} ${participant2}`;
  else return InvalidPaticipantsException;
};
