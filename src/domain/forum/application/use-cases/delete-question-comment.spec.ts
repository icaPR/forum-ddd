import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-question-comment-repositories";
import { makeQuestionComment } from "test/factories/make-question-comment";
import { DeleteQuestionCommentUseCase } from "./delete-question-comment";

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: DeleteQuestionCommentUseCase;

describe("Delete question comment", async () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();
    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository);
  });

  it("should be able to delete a question comment", async () => {
    const questionComment = makeQuestionComment();
    await inMemoryQuestionCommentsRepository.create(questionComment);

    await sut.handle({
      questionCommentId: questionComment.id.toString(),
      authorId: questionComment.authorId.toString(),
    });
    expect(inMemoryQuestionCommentsRepository.item).toHaveLength(0);
  });
});
