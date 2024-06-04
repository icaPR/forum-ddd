import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comment-repositories";
import { FetchAnswerCommentsUseCase } from "./fetch-answer-comments";
import { makeAnswerComment } from "test/factories/make-answer-comment";

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: FetchAnswerCommentsUseCase;

describe("Fetch answer comments", async () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository);
  });

  it("should be able to fetch answer comments", async () => {
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityID("answer1") })
    );
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityID("answer2") })
    );
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityID("answer1") })
    );

    const { answerComments } = await sut.handle({
      answerId: "answer1",
      page: 1,
    });

    expect(answerComments).toHaveLength(2);
  });

  it("should be able to fetch pagination answer comments", async () => {
    for (let i = 1; 1 < 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({ answerId: new UniqueEntityID("answer1") })
      );
    }

    const { answerComments } = await sut.handle({
      answerId: "answer1",
      page: 2,
    });
    expect(answerComments).toHaveLength(2);
  });
});
