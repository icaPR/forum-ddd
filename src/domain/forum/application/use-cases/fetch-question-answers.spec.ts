import { FetchQuestionAnswersUseCase } from "./fetch-question-answers";
import { InMemoryAnswerRepository } from "test/repositories/in-memory-answer-repositories";
import { makeAnswer } from "test/factories/make-answer";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let sut: FetchQuestionAnswersUseCase;

describe("Fetch question answer", async () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository();
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswerRepository);
  });

  it("should be able to fetch question answers", async () => {
    await inMemoryAnswerRepository.create(
      makeAnswer({ questionId: new UniqueEntityID("question1") })
    );
    await inMemoryAnswerRepository.create(
      makeAnswer({ questionId: new UniqueEntityID("question2") })
    );
    await inMemoryAnswerRepository.create(
      makeAnswer({ questionId: new UniqueEntityID("question1") })
    );

    const { answers } = await sut.handle({ questionId: "question1", page: 1 });

    expect(answers).toHaveLength(2);
  });

  it("should be able to fetch pagination question answers", async () => {
    for (let i = 1; 1 < 22; i++) {
      await inMemoryAnswerRepository.create(
        makeAnswer({ questionId: new UniqueEntityID("question1") })
      );
    }

    const { answers } = await sut.handle({
      questionId: "question1",
      page: 1,
    });
    expect(answers).toHaveLength(20);
  });
});
