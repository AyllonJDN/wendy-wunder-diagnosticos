import { Document, Page, Text, View } from "@react-pdf/renderer";
import {
  SCALING_CLOSING,
  SCALING_CLOSING_NOTE,
  SCALING_REFLECTION_PROMPT,
} from "../../data/scaling";
import type { ScalingResult } from "../../types";
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

const ISSUE = "01";
const RUNNING_TITLE = "ANTES DE ESCALAR";

export function ScalingPdf({
  result,
  name,
  date,
}: {
  result: ScalingResult;
  name?: string;
  date: string;
}) {
  const safeName = pdfSafe(name);
  const reflection = pdfSafe(result.reflection);

  return (
    <Document
      title="WENDY WÜNDER · Antes de escalar"
      author="WENDY WÜNDER"
      subject="Diagnóstico personal"
    >
      {/* P1 — Portada */}
      <Page size="A4" style={{ ...s.page, padding: 0 }}>
        <Cover
          number={ISSUE}
          titleLines={["ANTES DE ESCALAR"]}
          subtitle="Tu diagnóstico personal."
          name={safeName}
          date={date}
        />
      </Page>

      {/* P2 — Resultado */}
      <Page size="A4" style={s.page}>
        <RunningFrame issue={ISSUE} title={RUNNING_TITLE} />
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          <Text
            style={{
              fontFamily: F.serifBold,
              fontSize: 210,
              lineHeight: 0.95,
              color: C.ink,
            }}
          >
            {result.score}
            <Text style={{ color: C.magenta, letterSpacing: 6 }}>/3</Text>
          </Text>
        </View>
        <View style={{ marginTop: 6, marginBottom: 20 }}>
          <GradientBar width={120} height={5} id="scoreBar" />
        </View>

        <Row label="TU RESULTADO" first>
          <Text
            style={{ ...s.bodyLarge, fontFamily: F.serifBold, fontSize: 19 }}
          >
            {result.headline}
          </Text>
        </Row>
        <Row label="LO QUE ESTÁ FUNCIONANDO">
          {result.working.map((t) => (
            <Text key={t} style={{ ...s.body, marginBottom: 4 }}>
              {t}
            </Text>
          ))}
        </Row>
        <Row label="LO QUE NECESITAS REVISAR">
          {result.pending.length === 0 ? (
            <Text style={s.body}>
              No aparecen dimensiones pendientes en tus respuestas.
            </Text>
          ) : (
            result.pending.map((p) => (
              <View key={p.key} style={{ marginBottom: 8 }} wrap={false}>
                <Text style={{ ...s.label, marginBottom: 3 }}>{p.title}</Text>
                <Text style={s.body}>{p.text}</Text>
              </View>
            ))
          )}
        </Row>
        <Row label="TU SIGUIENTE PASO">
          <Text style={{ ...s.bodyLarge, fontFamily: F.serifItalic }}>
            {result.nextStep}
          </Text>
        </Row>
      </Page>

      {/* P3 — Mapa */}
      <Page size="A4" style={{ ...s.page, ...s.pagePaper }}>
        <RunningFrame issue={ISSUE} title={RUNNING_TITLE} />
        <Text style={{ ...s.labelMagenta, marginBottom: 6 }}>TU MAPA</Text>
        <Text
          style={{
            fontFamily: F.serifBold,
            fontSize: 34,
            lineHeight: 1.1,
            marginBottom: 22,
          }}
        >
          Tres dimensiones, una sola pregunta:
          {"\n"}
          ¿está lista tu idea para crecer?
        </Text>

        {result.dimensions.map((d, i) => (
          <View
            key={d.key}
            wrap={false}
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderTopWidth: i === 0 ? 1.5 : 0.75,
              borderTopColor: C.ink,
              paddingVertical: 16,
            }}
          >
            <Text
              style={{
                width: 110,
                fontFamily: F.serifBold,
                fontSize: 66,
                lineHeight: 1,
                color: d.validated ? C.magenta : C.ink,
              }}
            >
              {d.index}
            </Text>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: F.serifBold,
                  fontSize: 22,
                  letterSpacing: 1,
                }}
              >
                {d.label}
              </Text>
            </View>
            <View
              style={{
                paddingVertical: 6,
                paddingHorizontal: 12,
                backgroundColor: d.validated ? C.ink : "transparent",
                borderWidth: 1,
                borderColor: C.ink,
              }}
            >
              <Text
                style={{
                  ...s.label,
                  color: d.validated ? C.white : C.ink,
                }}
              >
                {d.validated ? "VALIDADO" : "POR REVISAR"}
              </Text>
            </View>
          </View>
        ))}
        <View style={s.hair} />

        <View style={{ flexDirection: "row", marginTop: 30 }}>
          {[
            ["ETAPA ACTUAL", result.context.stageLabel],
            ["PRINCIPAL FRENO", result.context.blockerLabel],
            ["META 90 DÍAS", result.context.goalLabel],
          ].map(([k, v]) => (
            <View key={k} style={{ flex: 1, paddingRight: 12 }}>
              <Text style={s.labelMagenta}>{k}</Text>
              <Text
                style={{
                  fontFamily: F.serifBold,
                  fontSize: 15,
                  marginTop: 6,
                  lineHeight: 1.25,
                }}
              >
                {v}
              </Text>
            </View>
          ))}
        </View>

        <View style={{ marginTop: 30 }} wrap={false}>
          <View style={s.hairLight} />
          <Text style={{ ...s.body, marginTop: 12, fontFamily: F.sansItalic }}>
            {result.context.note}
          </Text>
        </View>
      </Page>

      {/* P4 — Demuestra esto */}
      <Page size="A4" style={s.page}>
        <RunningFrame issue={ISSUE} title={RUNNING_TITLE} />
        <Text
          style={{
            fontFamily: F.serifBold,
            fontSize: 30,
            lineHeight: 1.08,
            marginBottom: 14,
          }}
        >
          ANTES DE ESCALAR,{"\n"}DEMUESTRA ESTO.
        </Text>

        {result.pending.length === 0 ? (
          <View
            style={{
              borderTopWidth: 1.5,
              borderTopColor: C.ink,
              paddingTop: 12,
            }}
          >
            <Text style={s.bodyLarge}>
              Tus tres dimensiones aparecen respaldadas. Al escalar, vuelve a
              revisarlas en cada etapa: demanda, venta y entrega tienen que
              sostenerse juntas.
            </Text>
          </View>
        ) : (
          result.pending.map((p, i) => (
            <View
              key={p.key}
              wrap={false}
              style={{
                flexDirection: "row",
                borderTopWidth: i === 0 ? 1.5 : 0.75,
                borderTopColor: C.ink,
                paddingTop: 12,
                paddingBottom: 14,
              }}
            >
              <Text
                style={{
                  width: 56,
                  fontFamily: F.serifBold,
                  fontSize: 34,
                  lineHeight: 1,
                  color: C.magenta,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </Text>
              <View style={{ flex: 1 }}>
                <Text style={{ ...s.label, marginBottom: 4 }}>{p.title}</Text>
                <Text style={{ ...s.bodyLarge, fontFamily: F.serifItalic }}>
                  {p.question}
                </Text>
                <Text style={{ ...s.body, marginTop: 5, color: C.grey }}>
                  {p.action}
                </Text>
                {p.points && (
                  <Text style={{ ...s.body, marginTop: 4 }}>
                    Puntos de revisión: {p.points.join("  ·  ")}
                  </Text>
                )}
              </View>
            </View>
          ))
        )}

        {reflection ? (
          <View
            wrap={false}
            style={{
              borderTopWidth: 0.75,
              borderTopColor: C.ink,
              paddingTop: 12,
            }}
          >
            <Text style={{ ...s.labelMagenta, marginBottom: 4 }}>
              TU REFLEXIÓN
            </Text>
            <Text
              style={{ ...s.body, fontFamily: F.sansBold, marginBottom: 4 }}
            >
              {SCALING_REFLECTION_PROMPT}
            </Text>
            <Text style={{ ...s.bodyLarge, fontSize: 11.5, lineHeight: 1.35 }}>
              {reflection}
            </Text>
          </View>
        ) : null}

        <View style={{ flexGrow: 1 }} />

        <View
          wrap={false}
          style={{
            backgroundColor: C.ink,
            padding: 16,
            marginTop: 12,
          }}
        >
          <View style={{ marginBottom: 8 }}>
            <GradientBar width={70} height={4} id="closeBar" />
          </View>
          {SCALING_CLOSING.map((l) => (
            <Text
              key={l}
              style={{
                fontFamily: F.serifBold,
                fontSize: 17,
                lineHeight: 1.15,
                color: C.white,
              }}
            >
              {l}
            </Text>
          ))}
          <View style={{ marginTop: 12 }}>
            {SCALING_CLOSING_NOTE.map((l) => (
              <Text
                key={l}
                style={{
                  fontFamily: F.serifItalic,
                  fontSize: 12.5,
                  color: C.white,
                  lineHeight: 1.4,
                }}
              >
                {l}
              </Text>
            ))}
          </View>
          <Text
            style={{
              fontFamily: F.serifBold,
              fontSize: 11,
              letterSpacing: 3,
              color: C.orange,
              marginTop: 14,
            }}
          >
            WENDY WÜNDER
          </Text>
        </View>
      </Page>
    </Document>
  );
}
