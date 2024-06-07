import { AggregateRoot } from "@/core/entities/aggregate-root";
import { Slug } from "./value-object/slug";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/types/optional";
import dayjs from "dayjs";
import { QuestionAttachmentList } from "./question-attachment-list";

export interface QuestionProps {
  authorId: UniqueEntityID;
  bestAnswerId?: UniqueEntityID;
  title: string;
  content: string;
  slug: Slug;
  attachments: QuestionAttachmentList;
  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends AggregateRoot<QuestionProps> {
  get authorId() {
    return this.props.authorId;
  }
  get bestAnswerId() {
    return this.props.bestAnswerId;
  }
  get title() {
    return this.props.title;
  }
  get content() {
    return this.props.content;
  }
  get slug() {
    return this.props.slug;
  }
  get attachments() {
    return this.props.attachments;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }
  get isNew() {
    return dayjs().diff(this.createdAt, "days") <= 3;
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat("...");
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  set title(title: string) {
    this.props.title = title;
    this.props.slug = Slug.createFromText(title);
    this.touch();
  }
  set content(content: string) {
    this.props.content = content;
    this.touch();
  }
  set bestAnswerId(bestAnswerId: UniqueEntityID | undefined) {
    this.props.bestAnswerId = bestAnswerId;
  }
  set attachments(attachments: QuestionAttachmentList) {
    this.props.attachments = attachments;
  }

  static create(
    props: Optional<QuestionProps, "createdAt" | "slug" | "attachments">,
    id?: UniqueEntityID
  ) {
    const question = new Question(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        slug: props.slug ?? Slug.createFromText(props.title),
        attachments: props.attachments ?? new QuestionAttachmentList(),
      },
      id
    );
    return question;
  }
}
