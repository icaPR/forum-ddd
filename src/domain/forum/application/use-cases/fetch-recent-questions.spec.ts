import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repositories";
import { makeQuestion } from "test/factories/make-questions";
import { FetchRecentQuestionsUseCase } from "./fecth-recent-questions";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: FetchRecentQuestionsUseCase;

describe("Fetch recent questions", async () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to fetch recent questions ", async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2000, 0, 10) })
    );
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2000, 0, 15) })
    );
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2000, 0, 20) })
    );

    const { questions } = await sut.handle({ page: 1 });

    expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2000, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2000, 0, 15) }),
      expect.objectContaining({ createdAt: new Date(2000, 0, 10) }),
    ]);
  });

  it("should be able to fetch pagination recent questions ", async () => {
    for (let i = 1; 1 < 22; i++) {
      await inMemoryQuestionsRepository.create(
        makeQuestion({ createdAt: new Date(2000, 0, i) })
      );
    }

    const { questions } = await sut.handle({ page: 2 });

    expect(questions).toHaveLength(2);
  });
});
