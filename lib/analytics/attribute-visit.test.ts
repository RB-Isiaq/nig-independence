import { describe, expect, it } from "vitest";
import { attributeVisit } from "./attribute-visit";

const SITE = "https://nig-independence.vercel.app";

describe("attributeVisit", () => {
  it("records each platform link as its own page", () => {
    expect(attributeVisit(`${SITE}/?utm_source=instagram`)).toBe(`${SITE}/from/instagram`);
    expect(attributeVisit(`${SITE}/?utm_source=tiktok`)).toBe(`${SITE}/from/tiktok`);
    expect(attributeVisit(`${SITE}/?utm_source=whatsapp`)).toBe(`${SITE}/from/whatsapp`);
  });

  it("normalises case and ignores other UTM fields", () => {
    expect(attributeVisit(`${SITE}/?utm_source=Instagram&utm_medium=story`)).toBe(`${SITE}/from/instagram`);
  });

  it("leaves untagged visits alone", () => {
    expect(attributeVisit(`${SITE}/`)).toBe(`${SITE}/`);
    expect(attributeVisit(`${SITE}/#timeline`)).toBe(`${SITE}/#timeline`);
  });

  it("ignores junk sources rather than creating odd pages", () => {
    expect(attributeVisit(`${SITE}/?utm_source=`)).toBe(`${SITE}/?utm_source=`);
    expect(attributeVisit(`${SITE}/?utm_source=%3Cscript%3E`)).toBe(`${SITE}/?utm_source=%3Cscript%3E`);
    expect(attributeVisit(`${SITE}/?utm_source=${"a".repeat(40)}`)).toBe(`${SITE}/?utm_source=${"a".repeat(40)}`);
  });

  it("drops the owner's recording sessions", () => {
    expect(attributeVisit(`${SITE}/?record&autoplay`)).toBeNull();
    expect(attributeVisit(`${SITE}/?record&utm_source=tiktok`)).toBeNull();
  });
});
