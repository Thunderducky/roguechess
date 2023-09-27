from Options import AssembleOptions, Toggle, DefaultOnToggle, Range
import typing

# TODO Difficulty

class Chess960(Toggle):
    """Shuffles home ranks following Chess960 rules."""
    display_name = "Chess960"

class Squaresanity(Toggle):
    """
    Checks are locked behind specific squares, rather than total number of unique squares traversed.
    Maximum Squares setting is ignored when Squaresanity is enabled.
    """
    display_name = "Squaresanity"

class MaximumSquares(Range):
    """
    Maximum number of square traversals that will award a check.
    Set to zero to disable square checks.
    """
    display_name = "Maximum Squares"
    range_start = 0
    range_end = 63
    default = 63

class PawnChecks(Toggle):
    """Capturing each opposing pawn for the first time awards a check."""
    display_name = "Pawn Checks"

class KnightChecks(Toggle):
    """Capturing each opposing knight for the first time awards a check."""
    display_name = "Knight Checks"

class BishopChecks(Toggle):
    """Capturing each opposing bishop for the first time awards a check."""
    display_name = "Bishop Checks"

class RookChecks(DefaultOnToggle):
    """Capturing each opposing rook for the first time awards a check."""
    display_name = "Rook Checks"

class QueenChecks(DefaultOnToggle):
    """Capturing each opposing queen for the first time awards a check."""
    display_name = "Queen Checks"

# TODO Timer

# TODO Spells

rogue_chess_options: typing.Dict[str, AssembleOptions] = {
    # "chess960": Chess960,
    "squaresanity": Squaresanity,
    "maximum_squares": MaximumSquares,
    "pawn_checks": PawnChecks,
    "knight_checks": KnightChecks,
    "bishop_checks": BishopChecks,
    "rook_checks": RookChecks,
    "queen_checks": QueenChecks,
}