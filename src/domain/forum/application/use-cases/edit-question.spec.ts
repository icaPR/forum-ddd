import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repositories";
import { makeQuestion } from "test/factories/make-questions";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { EditQuestionUseCase } from "./edit-question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe("Edit question", async () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to edit a question", async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityID("author1") },
      new UniqueEntityID("question1")
    );
    inMemoryQuestionsRepository.create(newQuestion);

    await sut.handle({
      authorId: "author1",
      questionId: newQuestion.id.toValue(),
      title: "title",
      content: "content",
    });

    expect(inMemoryQuestionsRepository.item[0]).toMatchObject({
      title: "title",
      content: "content",
    });
  });
  it("should not be able to edit a question from another user", async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityID("author1") },
      new UniqueEntityID("question1")
    );
    inMemoryQuestionsRepository.create(newQuestion);

    await expect(() => {
      return sut.handle({
        authorId: "author2",
        questionId: newQuestion.id.toValue(),
        title: "title",
        content: "content",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
