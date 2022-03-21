/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "annotatron";
import { Repository, EntityIdentifier } from "@/backend/common/domain";
import { Evaluation } from "./evaluation";
import { Quarter } from "./quarter";

const errorMessage =
  "EvaluationRepository abstraction should not be used. Use an implementation instead";

@Injectable()
export class EvaluationRepository extends Repository<Evaluation> {
  listEvaluationsSummary(): Promise<Evaluation[]> {
    throw new Error(errorMessage);
  }

  exists(evaluation: Evaluation): Promise<boolean> {
    throw new Error(errorMessage);
  }

  delete(evaluation: Evaluation): Promise<void> {
    throw new Error(errorMessage);
  }

  save(evaluation: Evaluation): Promise<void> {
    throw new Error(errorMessage);
  }
}
