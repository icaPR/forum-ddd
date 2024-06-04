import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comment-repositories";
import { DeleteAnswerCommentUseCase } from "./delete-answer-comment";
import { makeAnswerComment } from "test/factories/make-answer-comment";

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: DeleteAnswerCommentUseCase;

describe("Delete answer comment", async () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository);
  });

  it("should be able to delete a answer comment", async () => {
    const answerComment = makeAnswerComment();
    await inMemoryAnswerCommentsRepository.create(answerComment);

    await sut.handle({
      answerCommentId: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
    });
    expect(inMemoryAnswerCommentsRepository.item).toHaveLength(0);
  });
});
