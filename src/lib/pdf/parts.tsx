import {
  Defs,
  LinearGradient,
  Rect,
  Stop,
  Svg,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import type { ReactNode } from "react";

// Sin guiones automáticos en español: evita cortes de palabra raros.
Font.registerHyphenationCallback((word) => [word]);

export const C = {
  orange: "#FE7D00",
  magenta: "#D10851",
  pink: "#E2296A",
  ink: "#111111",
  white: "#FFFFFF",
  paper: "#F3F3F1",
  grey: "#6B6B68",
  line: "#D9D9D5",
};

export const F = {
  serif: "Times-Roman",
  serifBold: "Times-Bold",
  serifItalic: "Times-Italic",
  serifBoldItalic: "Times-BoldItalic",
  sans: "Helvetica",
  sansBold: "Helvetica-Bold",
  sansItalic: "Helvetica-Oblique",
};

/** Deja solo caracteres que las fuentes estándar del PDF pueden dibujar. */
export function pdfSafe(text: string | undefined | null): string {
  if (!text) return "";
  return text
    .normalize("NFC")
    .replace(/[\r\t]+/g, " ")
    .replace(/[^\n -~ -ÿ‘’“”–—…•€]/g, "")
    .trim();
}

export const s = StyleSheet.create({
  page: {
    backgroundColor: C.white,
    color: C.ink,
    fontFamily: F.sans,
    fontSize: 10,
    paddingTop: 64,
    paddingBottom: 60,
    paddingHorizontal: 48,
  },
  pagePaper: { backgroundColor: C.paper },
  label: {
    fontFamily: F.sansBold,
    fontSize: 7.5,
    letterSpacing: 2,
    color: C.ink,
  },
  labelMagenta: {
    fontFamily: F.sansBold,
    fontSize: 7.5,
    letterSpacing: 2,
    color: C.magenta,
  },
  body: { fontFamily: F.sans, fontSize: 10.5, lineHeight: 1.6, color: C.ink },
  bodyLarge: {
    fontFamily: F.serif,
    fontSize: 15,
    lineHeight: 1.45,
    color: C.ink,
  },
  hair: { height: 0.75, backgroundColor: C.ink },
  hairLight: { height: 0.75, backgroundColor: C.line },
});

export function GradientBar({
  width,
  height,
  id = "g",
  vertical = false,
}: {
  width: number;
  height: number;
  id?: string;
  vertical?: boolean;
}) {
  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <Defs>
        <LinearGradient
          id={id}
          x1="0"
          y1="0"
          x2={vertical ? "0" : "1"}
          y2={vertical ? "1" : "0"}
        >
          <Stop offset="0" stopColor={C.orange} />
          <Stop offset="1" stopColor={C.magenta} />
        </LinearGradient>
      </Defs>
      <Rect x="0" y="0" width={width} height={height} fill={`url(#${id})`} />
    </Svg>
  );
}

/** Cabecera y pie corrido para páginas interiores. */
export function RunningFrame({
  issue,
  title,
}: {
  issue: string;
  title: string;
}) {
  return (
    <>
      <View
        fixed
        style={{
          position: "absolute",
          top: 26,
          left: 48,
          right: 48,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          paddingBottom: 8,
          borderBottomWidth: 0.75,
          borderBottomColor: C.ink,
        }}
      >
        <Text
          style={{ fontFamily: F.serifBold, fontSize: 13, letterSpacing: 3 }}
        >
          WENDY WÜNDER
        </Text>
        <Text style={s.label}>
          {issue} · {title}
        </Text>
      </View>
      <View
        fixed
        style={{
          position: "absolute",
          bottom: 26,
          left: 48,
          right: 48,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 7.5, color: C.grey, letterSpacing: 1 }}>
          DIAGNÓSTICO PERSONAL
        </Text>
        <Text
          style={{ fontSize: 7.5, color: C.grey, letterSpacing: 1 }}
          render={({ pageNumber, totalPages }) =>
            `${String(pageNumber).padStart(2, "0")} / ${String(totalPages).padStart(2, "0")}`
          }
        />
      </View>
    </>
  );
}

/** Fila editorial: etiqueta angosta a la izquierda, contenido a la derecha. */
export function Row({
  label,
  children,
  first,
  wrap = false,
}: {
  label: string;
  children: ReactNode;
  first?: boolean;
  wrap?: boolean;
}) {
  return (
    <View
      wrap={wrap}
      style={{
        flexDirection: "row",
        borderTopWidth: first ? 1.5 : 0.75,
        borderTopColor: C.ink,
        paddingTop: 12,
        paddingBottom: 16,
      }}
    >
      <View style={{ width: 132, paddingRight: 12 }}>
        <Text style={s.labelMagenta}>{label}</Text>
      </View>
      <View style={{ flex: 1 }}>{children}</View>
    </View>
  );
}

/** Portada compartida por los dos PDFs. */
export function Cover({
  number,
  titleLines,
  subtitle,
  name,
  date,
}: {
  number: string;
  titleLines: string[];
  subtitle: string;
  name?: string;
  date: string;
}) {
  const W = 595.28;
  const H = 841.89;
  const heroH = 470;
  return (
    <>
      <View style={{ position: "absolute", top: 0, left: 0 }}>
        <GradientBar width={W} height={heroH} id="cover" />
      </View>
      <View
        style={{ position: "absolute", top: 0, left: 0, width: W, height: H }}
      >
        {/* Masthead */}
        <View
          style={{
            position: "absolute",
            top: 40,
            left: 48,
            right: 48,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderBottomWidth: 1,
            borderBottomColor: C.white,
            paddingBottom: 10,
          }}
        >
          <Text
            style={{
              fontFamily: F.serifBold,
              fontSize: 26,
              letterSpacing: 5,
              color: C.white,
            }}
          >
            WENDY WÜNDER
          </Text>
          <Text
            style={{
              fontFamily: F.sansBold,
              fontSize: 8,
              letterSpacing: 3,
              color: C.white,
            }}
          >
            HERRAMIENTAS
          </Text>
        </View>
        {/* Número gigante */}
        <Text
          style={{
            position: "absolute",
            top: 96,
            left: 34,
            fontFamily: F.serifBold,
            fontSize: 330,
            lineHeight: 1,
            color: C.white,
          }}
        >
          {number}
        </Text>
        {/* Bloque negro inferior */}
        <View
          style={{
            position: "absolute",
            top: heroH,
            left: 0,
            width: W,
            height: H - heroH,
            backgroundColor: C.ink,
            paddingHorizontal: 48,
            paddingTop: 34,
          }}
        >
          <Text style={{ ...s.label, color: C.orange, marginBottom: 14 }}>
            RECURSO {number}
          </Text>
          {titleLines.map((line) => (
            <Text
              key={line}
              style={{
                fontFamily: F.serifBold,
                fontSize: 40,
                lineHeight: 1.08,
                color: C.white,
              }}
            >
              {line}
            </Text>
          ))}
          <Text
            style={{
              fontFamily: F.serifItalic,
              fontSize: 20,
              color: C.white,
              marginTop: 16,
            }}
          >
            {subtitle}
          </Text>
          <View style={{ flexGrow: 1 }} />
          <View
            style={{
              flexDirection: "row",
              borderTopWidth: 0.75,
              borderTopColor: C.white,
              paddingTop: 12,
              marginBottom: 40,
            }}
          >
            <View style={{ width: 300 }}>
              <Text style={{ ...s.label, color: C.orange }}>PARA</Text>
              <Text
                style={{
                  fontFamily: F.serif,
                  fontSize: 15,
                  color: C.white,
                  marginTop: 4,
                }}
              >
                {name ? name : "Tu diagnóstico"}
              </Text>
            </View>
            <View>
              <Text style={{ ...s.label, color: C.orange }}>FECHA</Text>
              <Text
                style={{
                  fontFamily: F.serif,
                  fontSize: 15,
                  color: C.white,
                  marginTop: 4,
                }}
              >
                {date}
              </Text>
            </View>
          </View>
        </View>
        {/* WÜNDER vertical */}
        <View
          style={{
            position: "absolute",
            right: 14,
            top: 330,
            width: 26,
            height: 130,
          }}
        >
          <Text
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 130,
              fontFamily: F.serifBold,
              fontSize: 22,
              letterSpacing: 6,
              color: C.white,
              transform: "rotate(-90deg)",
              transformOrigin: "0 0",
              marginTop: 130,
            }}
          >
            WÜNDER
          </Text>
        </View>
      </View>
    </>
  );
}
