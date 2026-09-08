import { competitions } from '../data/competitions'
import type { Competition, Project } from '../types'

export function rankCompetitions(project: Project, outcomeGoal = ''): Competition[] {
  return competitions
    .map((competition) => {
      const tagScore = competition.tags.filter((tag) => project.tags.includes(tag)).length * 3
      const projectBoost = project.competitionIds.includes(competition.id) ? 4 - project.competitionIds.indexOf(competition.id) : 0
      const goalScore = competition.focus.includes(outcomeGoal) ? 5 : 0
      return { competition, score: tagScore + projectBoost + goalScore }
    })
    .sort((a, b) => b.score - a.score)
    .map(({ competition }) => competition)
}
