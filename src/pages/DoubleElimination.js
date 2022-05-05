import {
  DoubleEliminationBracket,
  Match,
  SVGViewer,
} from "@g-loot/react-tournament-brackets";
import useWindowSize from "../components/useWindowSize";
import matches from "../components/matches";

export const DoubleElimination = () => {
  const [width, height] = useWindowSize();
  const finalWidth = Math.max(width - 50, 500);
  const finalHeight = Math.max(height - 100, 500);
  return (
    <DoubleEliminationBracket
      matches={matches}
      matchComponent={Match}
      svgWrapper={({ children, ...props }) => (
        <SVGViewer width={finalWidth} height={finalHeight} {...props}>
          {children}
        </SVGViewer>
      )}
    />
  );
};
