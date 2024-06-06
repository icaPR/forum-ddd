import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { makeAnswer } from "test/factories/make-answer";
import { InMemoryAnswerRepository } from "test/repositories/in-memory-answer-repositories";
import { EditAnswerUseCase } from "./edit-answer";
import { NotAllowedError } from "./errors/not-allowed-error";

let inMemoryAnswersRepository: InMemoryAnswerRepository;
let sut: EditAnswerUseCase;

describe("Edit answer", async () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswerRepository();
    sut = new EditAnswerUseCase(inMemoryAnswersRepository);
  });

  it("should be able to edit a question", async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID("author1") },
      new UniqueEntityID("question1")
    );
    inMemoryAnswersRepository.create(newAnswer);

    await sut.handle({
      authorId: "author1",
      answerId: newAnswer.id.toValue(),
      content: "content",
    });

    expect(inMemoryAnswersRepository.item[0]).toMatchObject({
      content: "content",
    });
  });
  it("should not be able to edit a question from another user", async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID("author1") },
      new UniqueEntityID("question1")
    );
    inMemoryAnswersRepository.create(newAnswer);

    const result = await sut.handle({
      authorId: "author2",
      answerId: newAnswer.id.toValue(),
      content: "content",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
