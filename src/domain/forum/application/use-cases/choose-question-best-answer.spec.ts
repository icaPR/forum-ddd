import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { InMemoryAnswerRepository } from "test/repositories/in-memory-answer-repositories";
import { makeAnswer } from "test/factories/make-answer";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repositories";
import { ChooseQuestionBestAnswerUseCase } from "./choose-question-best-answer";
import { makeQuestion } from "test/factories/make-questions";

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: ChooseQuestionBestAnswerUseCase;

describe("Choose question best answer", async () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswerRepository
    );
  });

  it("should be able to choose question best answer", async () => {
    const newQuestion = makeQuestion();
    const newAnswer = makeAnswer({ questionId: newQuestion.id });

    await inMemoryQuestionsRepository.create(newQuestion);
    await inMemoryAnswerRepository.create(newAnswer);

    await sut.handle({
      answerId: newAnswer.id.toValue(),
      authorId: newQuestion.authorId.toValue(),
    });

    expect(inMemoryQuestionsRepository.item[0].bestAnswerId).toEqual(
      newAnswer.id
    );
  });
  it("should not be able to choose another user question best answer", async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID("author1"),
    });
    const newAnswer = makeAnswer({ questionId: newQuestion.id });

    await inMemoryQuestionsRepository.create(newQuestion);
    await inMemoryAnswerRepository.create(newAnswer);

    await expect(() => {
      return sut.handle({
        answerId: newAnswer.id.toValue(),
        authorId: "author2",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
