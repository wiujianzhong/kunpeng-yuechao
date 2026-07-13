import AppKit
import Foundation
import Vision

guard CommandLine.arguments.count > 1 else {
    fputs("用法：ocr_page.swift 图片路径\n", stderr)
    exit(1)
}

let imagePath = CommandLine.arguments[1]
guard let image = NSImage(contentsOfFile: imagePath),
      let data = image.tiffRepresentation,
      let bitmap = NSBitmapImageRep(data: data),
      let cgImage = bitmap.cgImage else {
    fputs("无法读取图片：\(imagePath)\n", stderr)
    exit(2)
}

let request = VNRecognizeTextRequest()
request.recognitionLevel = .accurate
request.recognitionLanguages = ["zh-Hans", "en-US"]
request.usesLanguageCorrection = true
request.minimumTextHeight = 0.007

let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
try handler.perform([request])

let observations = (request.results ?? []).sorted {
    let yGap = abs($0.boundingBox.midY - $1.boundingBox.midY)
    if yGap > 0.012 { return $0.boundingBox.midY > $1.boundingBox.midY }
    return $0.boundingBox.minX < $1.boundingBox.minX
}

for observation in observations {
    guard let candidate = observation.topCandidates(1).first else { continue }
    let box = observation.boundingBox
    print(String(format: "%.4f\t%.4f\t%.4f\t%.4f\t%@", box.minX, box.minY, box.width, box.height, candidate.string))
}
