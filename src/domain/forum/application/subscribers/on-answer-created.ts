import { DomainEvents } from "@/core/events/domain-events";
import { EventHandler } from "@/core/events/event-handler";
import { AnswerCreatedEvent } from "../../enterprise/events/answer-created-event";
import { QuestionsRepository } from "../repositories/questions-repository";
import { SendNotificationUseCase } from "@/domain/notification/application/use-cases/send-notification";

export class OnAnswerCreated implements EventHandler {
  constructor(
    private questionsRepository: QuestionsRepository,
    private sendNotificationUseCase: SendNotificationUseCase
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.handleSendNewAnserNotification.bind(this),
      AnswerCreatedEvent.name
    );
  }

  private async handleSendNewAnserNotification({ answer }: AnswerCreatedEvent) {
    const question = await this.questionsRepository.findById(
      answer.questionId.toString()
    );

    if (question) {
      await this.sendNotificationUseCase.handle({
        recipientId: question.authorId.toString(),
        title: "New answer",
        content: answer.excerpt,
      });
    }
  }
}
