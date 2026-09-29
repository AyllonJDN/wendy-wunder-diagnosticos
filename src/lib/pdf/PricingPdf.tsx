import { Document, Page, Text, View } from "@react-pdf/renderer";
import {
  PRICING_CLOSING_CTA,
  PRICING_CLOSING_HEADLINE,
  PRICING_CLOSING_LINES,
  REFLECTION_ITEMS,
  REFLECTION_TITLE,
} from "../../data/pricing";
import type { PricingResult, PricingSignal } from "../../types";
import {
  C,
  Cover,
  F,
  GradientBar,
  RunningFrame,
  Row,
  pdfSafe,
  s,
} from "./parts";

const ISSUE = "02";
const RUNNING_TITLE = "PRECIO Y VALOR";

function SignalBlock({
  signal,
  first,
}: {
  signal: PricingSignal;
  first: boolean;
}) {
  const { action } = signal;
  return (
    <View
      wrap={false}
      style={{
        flexDirection: "row",
        borderTopWidth: first ? 1.5 : 0.75,
        borderTopColor: C.ink,
        paddingTop: 12,
        paddingBottom: 16,
      }}
    >
      <View style={{ width: 92 }}>
        <Text
          style={{
            fontFamily: F.serifBold,
            fontSize: 58,
            lineHeight: 1,
            color: C.magenta,
          }}
        >
          {String(signal.id).padStart(2, "0")}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ ...s.label, marginBottom: 4 }}>{signal.area}</Text>
        <Text
          style={{
            fontFamily: F.serifBold,
            fontSize: 16,
            lineHeight: 1.2,
            marginBottom: 8,
          }}
        >
          {signal.title}
        </Text>
        <Text style={{ ...s.labelMagenta, marginBottom: 2 }}>
          QUÉ ESTÁ PASANDO
        </Text>
        <Text
          style={{
            fontFamily: F.serifItalic,
            fontSize: 11.5,
            lineHeight: 1.3,
            marginBottom: 3,
          }}
        >
          {signal.summary}
        </Text>
        {signal.detail.map((d) => (
          <Text key={d} style={{ ...s.body, fontSize: 9.5, lineHeight: 1.45, marginBottom: 3 }}>
            {d}
          </Text>
        ))}
        <Text style={{ ...s.labelMagenta, marginTop: 4, marginBottom: 2 }}>
          ACCIÓN CONCRETA
        </Text>
        {action.lead ? (
          <Text style={{ ...s.body, fontSize: 9.5, lineHeight: 1.45 }}>{action.lead}</Text>
        ) : null}
        {action.items?.map((it, i) => (
          <Text key={it} style={{ ...s.body, fontSize: 9.5, lineHeight: 1.45 }}>
            {action.ordered ? `${i + 1}. ` : "–  "}
            {it}
          </Text>
        ))}
        {action.notes?.map((n) => (
          <Text
            key={n}
            style={{ ...s.body, fontSize: 9.5, lineHeight: 1.45, fontFamily: F.sansBold, marginTop: 3 }}
          >
            {n}
          </Text>
        ))}
        <Text style={{ ...s.labelMagenta, marginTop: 6, marginBottom: 2 }}>
          TU RETO
        </Text>
        <Text style={{ ...s.body, fontFamily: F.sansBold, fontSize: 10 }}>
          {signal.challenge}
        </Text>
      </View>
    </View>
  );
}

export function PricingPdf({
  result,
  name,
  date,
}: {
  result: PricingResult;
  name?: string;
  date: string;
}) {
  const safeName = pdfSafe(name);
  const otherText = pdfSafe(result.nextLevel.label);

  return (
    <Document
      title="WENDY WÜNDER · ¿Tu precio refleja tu valor?"
      author="WENDY WÜNDER"
      subject="Diagnóstico personal"
    >
      {/* P1 — Portada */}
      <Page size="A4" style={{ ...s.page, padding: 0 }}>
        <Cover
          number={ISSUE}
          titleLines={["¿TU PRECIO", "REFLEJA TU VALOR?"]}
          subtitle="Diagnóstico personal."
          name={safeName}
          date={date}
        />
      </Page>

      {/* P2 — Score */}
      <Page size="A4" style={s.page}>
        <RunningFrame issue={ISSUE} title={RUNNING_TITLE} />
        <Text
          style={{
            fontFamily: F.serifBold,
            fontSize: 210,
            lineHeight: 0.95,
            color: C.ink,
          }}
        >
          {result.score}
          <Text style={{ color: C.magenta, letterSpacing: 6 }}>/5</Text>
        </Text>
        <View style={{ marginTop: 6, marginBottom: 6 }}>
          <GradientBar width={120} height={5} id="pScoreBar" />
        </View>
        <Text style={{ ...s.labelMagenta, marginTop: 10, marginBottom: 18 }}>
          SEÑALES RECONOCIDAS
        </Text>

        <Row label="DIAGNÓSTICO PRINCIPAL" first>
          <Text
            style={{
              fontFamily: F.serifBold,
              fontSize: 22,
              lineHeight: 1.15,
              marginBottom: 8,
            }}
          >
            {result.title}
          </Text>
          <Text style={s.bodyLarge}>{result.text}</Text>
          {result.extra.map((t) => (
            <Text
              key={t}
              style={{
                ...s.bodyLarge,
                fontFamily: F.serifItalic,
                marginTop: 6,
              }}
            >
              {t}
            </Text>
          ))}
        </Row>
        <Row label="LO QUE YA ESTÁS SOSTENIENDO">
          {result.held.length === 0 ? (
            <Text style={s.body}>
              Reconociste las cinco señales. Verlas con claridad es el primer
              paso para revisarlas.
            </Text>
          ) : (
            result.held.map((t) => (
              <Text key={t} style={{ ...s.body, marginBottom: 4 }}>
                {t}
              </Text>
            ))
          )}
        </Row>
      </Page>

      {/* P3+ — Señales (solo las reconocidas); fluye en las páginas necesarias */}
      {result.toReview.length > 0 ? (
        <Page size="A4" style={{ ...s.page, ...s.pagePaper }}>
          <RunningFrame issue={ISSUE} title={RUNNING_TITLE} />
          <View wrap={false}>
            <Text style={{ ...s.labelMagenta, marginBottom: 6 }}>TUS SEÑALES</Text>
            <Text
              style={{
                fontFamily: F.serifBold,
                fontSize: 30,
                lineHeight: 1.1,
                marginBottom: 16,
              }}
            >
              Lo que reconociste este mes.
            </Text>
          </View>
          {result.toReview.map((sig, i) => (
            <SignalBlock key={sig.id} signal={sig} first={i === 0} />
          ))}
          <View style={s.hair} />
        </Page>
      ) : null}

      {/* Siguiente nivel */}
      <Page size="A4" style={s.page}>
        <RunningFrame issue={ISSUE} title={RUNNING_TITLE} />
        <Text style={{ ...s.labelMagenta, marginBottom: 8 }}>
          TU SIGUIENTE NIVEL
        </Text>
        <Text
          style={{
            fontFamily: F.serifBold,
            fontSize: otherText.length > 60 ? 28 : 40,
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          {otherText}
        </Text>
        <View style={{ marginBottom: 24 }}>
          <GradientBar width={120} height={5} id="nlBar" />
        </View>

        {result.nextLevel.reading ? (
          <Row label="LECTURA" first>
            <Text style={s.bodyLarge}>{result.nextLevel.reading}</Text>
            {result.nextLevel.action ? (
              <Text style={{ ...s.body, marginTop: 10 }}>
                {result.nextLevel.action}
              </Text>
            ) : null}
          </Row>
        ) : null}
        <Row label="ESTA SEMANA" first={!result.nextLevel.reading}>
          <Text style={{ ...s.bodyLarge, fontFamily: F.serifBoldItalic }}>
            {result.weekAction}
          </Text>
        </Row>
      </Page>

      {/* Reflexión */}
      <Page size="A4" style={{ ...s.page, ...s.pagePaper }}>
        <RunningFrame issue={ISSUE} title={RUNNING_TITLE} />
        <Text
          style={{
            fontFamily: F.serifBold,
            fontSize: 30,
            lineHeight: 1.1,
            marginBottom: 22,
          }}
        >
          {REFLECTION_TITLE.toUpperCase()}
        </Text>
        {REFLECTION_ITEMS.map((item, i) => (
          <View
            key={item.q}
            wrap={false}
            style={{
              flexDirection: "row",
              borderTopWidth: i === 0 ? 1.5 : 0.75,
              borderTopColor: C.ink,
              paddingTop: 10,
              paddingBottom: 12,
            }}
          >
            <Text
              style={{
                width: 70,
                fontFamily: F.serifBold,
                fontSize: 40,
                lineHeight: 1,
                color: C.magenta,
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </Text>
            <View style={{ flex: 1, paddingTop: 2 }}>
              <Text
                style={{
                  fontFamily: F.serifItalic,
                  fontSize: 14.5,
                  lineHeight: 1.3,
                }}
              >
                {item.q}
              </Text>
              <Text style={{ ...s.body, fontSize: 9.5, lineHeight: 1.45, marginTop: 3, color: C.grey }}>
                {item.note}
              </Text>
            </View>
          </View>
        ))}
        <View style={s.hair} />
      </Page>

      {/* Cierre */}
      <Page
        size="A4"
        style={{ ...s.page, backgroundColor: C.ink, color: C.white }}
      >
        <View
          fixed
          style={{
            position: "absolute",
            top: 26,
            left: 48,
            right: 48,
            paddingBottom: 8,
            borderBottomWidth: 0.75,
            borderBottomColor: C.white,
          }}
        >
          <Text
            style={{
              fontFamily: F.serifBold,
              fontSize: 13,
              letterSpacing: 3,
              color: C.white,
            }}
          >
            WENDY WÜNDER
          </Text>
        </View>
        <View style={{ marginTop: 40 }}>
          <Text
            style={{
              fontFamily: F.serifBold,
              fontSize: 34,
              lineHeight: 1.12,
              color: C.white,
            }}
          >
            {PRICING_CLOSING_HEADLINE.join(" ").toUpperCase()}
          </Text>
        </View>
        <View style={{ marginVertical: 26 }}>
          <GradientBar width={120} height={5} id="finalBar" />
        </View>
        {PRICING_CLOSING_LINES.map((l) => (
          <Text
            key={l}
            style={{
              fontFamily: F.serifItalic,
              fontSize: 17,
              lineHeight: 1.45,
              color: C.white,
              marginBottom: 6,
            }}
          >
            {l}
          </Text>
        ))}
        <View style={{ flexGrow: 1 }} />
        <View style={{ marginBottom: 30 }}>
          {PRICING_CLOSING_CTA.map((l) => (
            <Text
              key={l}
              style={{
                fontFamily: F.serifBold,
                fontSize: 26,
                lineHeight: 1.15,
                color: C.orange,
              }}
            >
              {l.toUpperCase()}
            </Text>
          ))}
        </View>
        <Text
          style={{
            fontFamily: F.serifBold,
            fontSize: 16,
            letterSpacing: 5,
            color: C.white,
          }}
        >
          WENDY WÜNDER
        </Text>
      </Page>
    </Document>
  );
}
