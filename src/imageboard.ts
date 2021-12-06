import { contains } from "./utils";

export class ImageBoard {
  protected readonly name: string;

  protected readonly adminBarSelector: string;
  protected readonly postSelector: string;

  protected readonly postSubjectelector: string;
  protected readonly postNameSelector: string;
  protected readonly postTripSelector: string;
  protected readonly postBodySelector: string;

  protected constructor(
    name: string,
    adminBarSelector: string,
    postSelector: string,
    postSubjectSelector: string,
    postNameSelector: string,
    postTripSelector: string,
    postBodySelector: string
  ) {
    this.name = name;
    this.adminBarSelector = adminBarSelector;
    this.postSelector = postSelector;

    this.postSubjectelector = postSubjectSelector;
    this.postNameSelector = postNameSelector;
    this.postTripSelector = postTripSelector;
    this.postBodySelector = postBodySelector;
  }

  public getAdminBar(): JQuery {
    return $(this.adminBarSelector).first();
  }

  public getPosts(): JQuery {
    return $(this.postSelector);
  }

  public getPostSubject(post: JQuery): string {
    return post.find(this.postSubjectelector).text();
  }

  public getPostName(post: JQuery): string {
    return post.find(this.postNameSelector).text();
  }

  public getPostTripcode(post: JQuery): string {
    return post.find(this.postTripSelector).text();
  }

  public getPostBody(posts: JQuery): JQuery {
    return posts.find(this.postBodySelector);
  }

  public getPostBodyText(post: JQuery): string {
    return this.getPostBody(post).text();
  }

  public getPostBodyLinks(posts: JQuery): JQuery {
    return this.getPostBody(posts).find("a");
  }

  public getName(): string {
    return this.name;
  }

  public static detect(): boolean {
    return false;
  }
}

class Hanabira extends ImageBoard {
  public constructor() {
    super(
      "Hanabira",
      "div.adminbar",
      "td.reply[id]",
      "span.replytitle",
      "span.postername",
      "span.postertrip",
      "div.message"
    );
  }

  public static detect(): boolean {
    return contains($("p.footer").text(), "hanabira", true);
  }
}

class Makaba extends ImageBoard {
  public constructor() {
    super(
      "Makaba",
      "div#adminbar",
      "div.post[id]",
      "span.post-title",
      "span.ananimas",
      "span.postertrip",
      "blockquote"
    );
  }

  public static detect(): boolean {
    return $("body").hasClass("makaba");
  }
}

class Tinyboard extends ImageBoard {
  public constructor() {
    super(
      "Tinyboard",
      "div.boardlist",
      "div.post[id]",
      "span.subject",
      "span.name",
      "span.trip",
      "div.body"
    );
  }

  public static detect(): boolean {
    return contains($("footer").text(), "tinyboard", true);
  }
}

class TinyIB extends ImageBoard {
  public constructor() {
    super(
      "TinyIB",
      "div.adminbar",
      "td.reply[id], div.post[id]",
      "span.filetitle",
      "span.postername",
      "span.postertrip",
      "div.message"
    );
  }

  public static detect(): boolean {
    return contains($("footer").text(), "tinyib", true);
  }
}

class Monaba extends ImageBoard {
  public constructor() {
    super(
      "Monaba",
      "div#control-panel",
      "div.post[id]",
      "span.reply-title",
      "span.poster-name",
      "span.poster-trip",
      "div.message"
    );
  }

  public static detect(): boolean {
    return contains($("footer").text(), "monaba", true);
  }
}

class Phutaba extends ImageBoard {
  public constructor() {
    super(
      "Phutaba",
      "ul.menu",
      "div.thread_OP[id], div.thread_reply[id]",
      "span.subject",
      "span.postername",
      "span.tripcode",
      "div.post_body"
    );
  }

  public static detect(): boolean {
    return contains($("footer").text(), "phutaba", true);
  }
}

class Ochoba extends ImageBoard {
  public constructor() {
    super(
      "Ochoba",
      "div.adminbar",
      "td.reply[id]",
      "span.replytitle",
      "span.commentpostername",
      "span.postertrip",
      "blockquote"
    );
  }

  public static detect(): boolean {
    return (
      $("script[src]").filter((index, element) =>
        contains($(element).attr("src"), "ochoba", true)
      ).length > 0
    );
  }
}

class Wakaba extends ImageBoard {
  public constructor() {
    super(
      "Wakaba",
      "div.adminbar, div#adminbar",
      "td.reply[id]",
      "span.filetitle",
      "span.postername, span.commentpostername",
      "span.postertrip",
      "blockquote"
    );
  }

  public static detect(): boolean {
    return (
      $("script[src]").filter((index, element) =>
        contains($(element).attr("src"), "wakaba", true)
      ).length > 0
    );
  }
}

class Kusaba extends ImageBoard {
  public constructor() {
    super(
      "Kusaba",
      "div.adminbar",
      "td.reply[id], div.reply[id]",
      "span.filetitle",
      "span.postername",
      "span.postertrip",
      "blockquote"
    );
  }

  public static detect(): boolean {
    return (
      $("script[src]").filter((index, element) =>
        contains($(element).attr("src"), "kusaba", true)
      ).length > 0
    );
  }
}

export namespace ImageBoard {
  export function GetImageBoard(): ImageBoard {
    const engines = [
      Hanabira,
      Makaba,
      Tinyboard,
      TinyIB,
      Monaba,
      Phutaba,
      Ochoba,
      Wakaba,
      Kusaba,
    ];

    for (let i = 0; i < engines.length; i++) {
      if (engines[i].detect()) {
        return new engines[i]();
      }
    }

    return null;
  }
}
