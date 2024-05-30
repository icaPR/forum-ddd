import { Answer } from "../entities/answer";
import { AnswerRepository } from "../repositories/answers-repository";
import { AnswerQuestionUseCase } from "./answer-question";

const fakeAnswersRepository: AnswerRepository = {
  create: async (answer: Answer) => {
    return;
  },
};

test("create an answer ", async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository);

  const answer = await answerQuestion.handle({
    questionId: "1",
    instructorId: "1",
    content: "Content",
  });

  expect(answer.content).toEqual("Content");
});
